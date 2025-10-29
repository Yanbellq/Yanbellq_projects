
from django.urls import path
from .views import auth_views, payment_views, stats_views
from .views.auth_views import RegisterView, LoginView, LogoutView, GoogleAuthView
from .views.payment_views import generate_invoice, wfp_callback
from .views.stats_views import stats_view

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    # path('me/', me_view),
    path('generate-invoice/', generate_invoice),
    path('wfp-callback/', wfp_callback),
    path('stats/', stats_view),
    path('google-auth/', GoogleAuthView.as_view(), name='google_auth'),
]
