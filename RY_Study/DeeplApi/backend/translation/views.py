
from rest_framework import generics
from .models import User
from .serializers import UserSerializer
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate
import hashlib
import base64
from decouple import config
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from .models import Payment
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .utils import translate_text
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
import pandas as pd
from .models import Translation, Payment, User
from rest_framework.response import Response


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        return Response({'error': 'Invalid credentials'}, status=400)

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_invoice(request):
    user = request.user
    text = request.data.get('text')
    symbols = len(text)
    amount = round(symbols / 10, 2)

    order_reference = f"order_{user.id}_{timezone.now().timestamp()}"

    payment = Payment.objects.create(
        user=user,
        amount=amount,
        status="pending",
    )

    data = {
        "merchantAccount": config("WFP_ACCOUNT"),
        "merchantDomainName": "example.com",
        "orderReference": order_reference,
        "orderDate": int(timezone.now().timestamp()),
        "amount": str(amount),
        "currency": "UAH",
        "productName": ["Translation"],
        "productCount": ["1"],
        "productPrice": [str(amount)],
        "clientEmail": user.email,
        "returnUrl": "http://localhost:3000/payment-success",
        "serviceUrl": "http://localhost:8000/api/wfp-callback/"
    }

    signature_data = [
        data['merchantAccount'],
        data['merchantDomainName'],
        data['orderReference'],
        str(data['orderDate']),
        data['amount'],
        data['currency'],
        data['productName'][0],
        data['productCount'][0],
        data['productPrice'][0],
    ]
    joined = ';'.join(signature_data)
    secret = config("WFP_SECRET")
    signature = base64.b64encode(hashlib.sha1((joined + secret).encode()).digest()).decode()

    data["merchantSignature"] = signature

    return Response(data)



@api_view(['POST'])
def wfp_callback(request):
    from .models import Translation
    from django.core.mail import send_mail
    import requests

    merchant_signature = request.data.get("merchantSignature")
    order_reference = request.data.get("orderReference")
    transaction_status = request.data.get("transactionStatus")

    # Знаходимо платіж
    payment = Payment.objects.filter(status="pending").last()
    if not payment:
        return Response({"error": "Payment not found"}, status=404)

    if transaction_status == "Approved":
        payment.status = "Approved"
        payment.closed_at = timezone.now()
        payment.save()

        # Переклад через DeepL (тимчасово заглушка)
        source_text = "Hello world"
        lang_from = "EN"
        lang_to = "UK"

        translated_text = translate_text(source_text, lang_to, lang_from)

        Translation.objects.create(
            user=payment.user,
            payment=payment,
            source_text=source_text,
            translated_text=translated_text,
            source_lang=lang_from,
            target_lang=lang_to,
        )

        send_mail(
            subject="Ваш переклад готовий",
            message=f"Text: {source_text}\nTranslation: {translated_text}",
            from_email=config("EMAIL_HOST_USER"),
            recipient_list=[payment.user.email]
        )

    else:
        payment.status = transaction_status
        payment.closed_at = timezone.now()
        payment.save()

    return Response({"ok": True})


@api_view(['GET'])
@permission_classes([IsAdminUser])
def stats_view(request):
    # ORM → QuerySets
    translations = list(Translation.objects.select_related('user', 'payment').values())
    payments = list(Payment.objects.values())
    users = list(User.objects.values())

    # Pandas DataFrames
    df_trans = pd.DataFrame(translations)
    df_pay = pd.DataFrame(payments)
    df_users = pd.DataFrame(users)

    # Basic Stats
    total_translations = len(df_trans)
    total_income = df_pay[df_pay['status'] == 'Approved']['amount'].sum()
    avg_check = df_pay[df_pay['status'] == 'Approved']['amount'].mean()
    total_users = len(df_users)
    users_with_translations = df_trans['user_id'].nunique()

    return Response({
        "total_translations": int(total_translations),
        "total_income": float(total_income),
        "avg_check": round(float(avg_check), 2) if not pd.isna(avg_check) else 0,
        "total_users": total_users,
        "users_with_translations": users_with_translations,
        "orders": df_trans.sort_values(by='created_at', ascending=False).to_dict(orient='records'),
    })