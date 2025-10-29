
from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('translation.urls')),
    path('thank-you/', lambda r: HttpResponse("Дякуємо за оплату! Перевірте пошту."))

]
