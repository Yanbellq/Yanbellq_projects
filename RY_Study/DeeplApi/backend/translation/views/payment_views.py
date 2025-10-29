import os
import hashlib
import hmac
import json
from datetime import datetime
from decouple import config
import requests

from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from ..models import Payment, Translation, PendingTranslation
from django.core.mail import send_mail
from ..utils import translate_text

from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string


def send_translation_email(to_email, source_text, source_lang, target_lang, translated_text):
    subject = 'Ваш переклад готовий!'

    text_content = f"""
        Переклад з {source_lang} на {target_lang}:
    
        Оригінал:
        {source_text}
    
        Переклад:
        {translated_text}
    """

    email = EmailMultiAlternatives(subject, text_content, to=[to_email])
    email.send()

class WayForPay:
    API_URL = "https://api.wayforpay.com/api"

    def __init__(self):
        self.account = config("WFP_ACCOUNT")
        self.key = config("WFP_SECRET")
        self.domain = config("WFP_DOMAIN")
        self.frontLink = config("WFP_FRONT_LINK")

    def get_signature(self, data):
        order_reference = data['orderReference']
        order_date = data['orderDate']
        amount = data['amount']
        currency = data['currency']
        product_names = data['productName']
        product_counts = data['productCount']
        product_prices = data['productPrice']

        signature_text = (
            f"{self.account};{self.domain};{order_reference};{order_date};"
            f"{amount};{currency};"
            f"{';'.join(product_names)};{';'.join(str(c) for c in product_counts)};{';'.join(str(p) for p in product_prices)}"
        )
        return hmac.new(self.key.encode(), signature_text.encode(), hashlib.md5).hexdigest()

    @staticmethod
    def get_answer_signature(merchant_key, data):
        signature_text = f"{data['orderReference']};{data['status']};{data['time']}"
        return hmac.new(merchant_key.encode(), signature_text.encode(), hashlib.md5).hexdigest()

    def create_invoice(self, data):
        try:
            body = {
                "merchantSignature": self.get_signature(data),
                "merchantAccount": self.account,
                "merchantDomainName": self.domain,
                "transactionType": "CREATE_INVOICE",
                "apiVersion": "1",
                "language": "ua",
                "notifyMethod": "email"
            }
            body.update(data)
            headers = {"Content-Type": "application/json"}
            
            print(f"Відправляємо запит до WayForPay: {body}")  # для дебагу
            
            res = requests.post(self.API_URL, json=body, headers=headers)
            res.raise_for_status()  # перевірка статусу відповіді
            
            if res.text == "Api cannot read incoming request data. Unknown format":
                raise ValueError("Unknown format")
            
            return res.json()
        except requests.exceptions.RequestException as e:
            print(f"Помилка запиту до WayForPay: {str(e)}")
            raise
        except Exception as e:
            print(f"Неочікувана помилка: {str(e)}")
            raise


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_invoice(request):
    user = request.user
    text = request.data.get("text")
    lang_from = request.data.get("lang_from").upper()
    lang_to = request.data.get("lang_to").upper()
    returnUrl = request.data.get("returnUrl")
    symbols = len(text)
    amount = round(symbols / 10, 2)

    order_reference = f"order_{user.id}_{int(timezone.now().timestamp())}"
    now = int(timezone.now().timestamp())

    payment = Payment.objects.create(user=user, amount=amount, status="pending")

    PendingTranslation.objects.create(
        user=user,
        text=text,
        source_lang=lang_from,
        target_lang=lang_to,
        order_reference=order_reference
    )

    wfp = WayForPay()
    invoice_data = {
        "orderReference": order_reference,
        "orderDate": now,
        "orderTimeout": 900,
        "amount": str(amount),
        "currency": "UAH",
        "productName": ["Translation"],
        "productCount": ["1"],
        "productPrice": [str(amount)],
        "clientEmail": user.email,
        "serviceUrl": f"{wfp.domain}/api/wfp-callback/",
        "returnUrl": f"http://localhost:3000/payment-success"
    }

    response = wfp.create_invoice(invoice_data)
    return Response({"invoiceUrl": response.get("invoiceUrl")})

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def wfp_callback(request):
    try:
        raw_data = next(iter(request.data.keys()), '{}')
        data = json.loads(raw_data)
        now = int(datetime.now().timestamp())

        payment = Payment.objects.filter(status="pending").last()
        if not payment:
            return Response({"error": "Payment not found"}, status=404)
        if data.get("reasonCode") == 1100:
            payment.status = "Approved"
            payment.closed_at = timezone.now()
            payment.save()

            pending = PendingTranslation.objects.filter(order_reference=data['orderReference']).first()
            if pending:
                translated = translate_text(pending.text, pending.target_lang, pending.source_lang)

                Translation.objects.create(
                    user=pending.user,
                    payment=payment,
                    source_text=pending.text,
                    translated_text=translated,
                    source_lang=pending.source_lang,
                    target_lang=pending.target_lang
                )

                translation = Translation.objects.create(
                    user=pending.user,
                    payment=payment,
                    source_text=pending.text,
                    translated_text=translated,
                    source_lang=pending.source_lang,
                    target_lang=pending.target_lang
                )

                if pending.user.email:
                    print(f"📨 Надсилаємо email на {pending.user.email}")
                    send_translation_email(
                        to_email=pending.user.email,
                        source_text=pending.text,
                        source_lang=pending.source_lang,
                        target_lang=pending.target_lang,
                        translated_text=translated
                    )
                    return Response({
                        "original_text": pending.text,
                        "translated_text": translated,
                        "translation_id": translation.id,
                        "user_id": pending.user.id,
                        "payment_id": payment.id
                    })

                pending.delete()

        answer = {
            "orderReference": data["orderReference"],
            "status": "accept",
            "time": now
        }
        answer["signature"] = WayForPay.get_answer_signature(config("WFP_SECRET"), answer)
        return Response(answer)

    except Exception as e:
        return Response({"error": str(e)}, status=500)