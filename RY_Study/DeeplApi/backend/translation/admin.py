from django.contrib import admin
from .models import Payment, Translation, User

admin.site.register(User)
admin.site.register(Payment)
admin.site.register(Translation)