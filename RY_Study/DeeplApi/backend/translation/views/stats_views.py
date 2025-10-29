from django.contrib.auth.decorators import user_passes_test
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from django.db.models import Sum, Avg, Count
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from translation.models import Payment, Translation
import pandas as pd
from django.contrib.auth import get_user_model

@api_view(['GET'])
@permission_classes([IsAdminUser])
def stats_view(request):
    User = get_user_model()
    payments = Payment.objects.filter(status="Approved")
    translations = Translation.objects.all()

    df_payments = pd.DataFrame.from_records(payments.values('id', 'user__username', 'amount', 'created_at'))
    df_translations = pd.DataFrame.from_records(translations.values('id', 'user__username', 'source_lang', 'target_lang', 'created_at'))

    total_translations = len(df_translations)
    total_revenue = df_payments['amount'].sum() if not df_payments.empty else 0
    average_order = df_payments['amount'].mean() if not df_payments.empty else 0
    total_users = User.objects.count()
    users_with_translations = df_translations['user__username'].nunique()

    sort_key = request.GET.get('sort', 'created_at')
    filter_lang = request.GET.get('filter_lang')

    if filter_lang:
        df_translations = df_translations[(df_translations['source_lang'] == filter_lang) |
                                          (df_translations['target_lang'] == filter_lang)]

    if sort_key in df_translations.columns:
        df_translations = df_translations.sort_values(by=sort_key, ascending=True)

    translations_list = df_translations.to_dict(orient='records')

    return Response({
        "total_translations": total_translations,
        "total_revenue": total_revenue,
        "average_order": round(average_order, 2),
        "total_users": total_users,
        "users_with_translations": users_with_translations,
        "orders": translations_list
    })
