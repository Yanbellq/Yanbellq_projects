# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, get_user_model
from rest_framework import status, permissions, generics
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from decouple import config
import requests
import json
import jwt
from ..models import User
from ..serializers import UserSerializer


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
            return Response({
                'token': token.key,
                'user': {
                    'username': user.username,
                    'email': user.email,
                    "is_superuser": user.is_superuser,
                }
            })
        return Response({'error': 'Invalid credentials'}, status=400)


# class GoogleAuthView(APIView):
#     def post(self, request):
#         try:
#             token = request.data.get('token')
#             if not token:
#                 return Response({'error': 'Token is required'}, status=status.HTTP_400_BAD_REQUEST)
#
#             # Декодуємо токен без перевірки підпису (ми перевіримо через API Google)
#             payload = jwt.decode(token, options={"verify_signature": False})
#
#             # Перевірка аудиторії
#             if payload['aud'] != config('GOOGLE_OAUTH2_CLIENT_ID'):
#                 return Response({'error': 'Invalid token audience'}, status=status.HTTP_400_BAD_REQUEST)
#
#             # Перевірка через Google API
#             response = requests.get(
#                 f'https://oauth2.googleapis.com/tokeninfo?id_token={token}'
#             )
#             if response.status_code != 200:
#                 return Response({'error': 'Invalid Google token'}, status=status.HTTP_400_BAD_REQUEST)
#
#             google_data = response.json()
#
#             # Пошук або створення користувача
#             User = get_user_model()
#             email = google_data['email']
#
#             try:
#                 user = User.objects.get(email=email)
#             except User.DoesNotExist:
#                 # Створення нового користувача
#                 username = email.split('@')[0]
#                 # Генеруємо унікальний username, якщо вже існує
#                 while User.objects.filter(username=username).exists():
#                     username = f"{username}_{User.objects.filter(username__startswith=username).count()}"
#
#                 user = User.objects.create_user(
#                     username=username,
#                     email=email,
#                     password=None  # Генеруємо випадковий пароль
#                 )
#                 # Додаткові поля з Google
#                 if 'name' in google_data:
#                     user.first_name = google_data.get('given_name', '')
#                     user.last_name = google_data.get('family_name', '')
#                     user.save()
#
#             # Створюємо або отримуємо токен
#             token, created = Token.objects.get_or_create(user=user)
#
#             return Response({
#                 'token': token.key,
#                 'user': {
#                     'username': user.username,
#                     'email': user.email,
#                     'is_superuser': user.is_superuser
#                 }
#             })
#
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class GoogleAuthView(APIView):
    def post(self, request):
        try:
            access_token = request.data.get('access_token')
            if not access_token:
                return Response({'error': 'Access token is required'}, status=status.HTTP_400_BAD_REQUEST)

            # Отримуємо інформацію про користувача з Google API
            userinfo_response = requests.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                headers={'Authorization': f'Bearer {access_token}'}
            )

            if userinfo_response.status_code != 200:
                return Response(
                    {'error': 'Failed to fetch user info from Google'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            google_data = userinfo_response.json()
            email = google_data.get('email')

            if not email:
                return Response(
                    {'error': 'Email not provided by Google'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Пошук або створення користувача
            User = get_user_model()

            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                # Створення нового користувача
                username = self.generate_unique_username(email)

                user = User.objects.create_user(
                    username=username,
                    email=email,
                    password=None  # Генеруємо випадковий пароль
                )

                # Додаткові поля з Google
                if 'name' in google_data:
                    user.first_name = google_data.get('given_name', '')
                    user.last_name = google_data.get('family_name', '')
                    user.save()

            # Створюємо або отримуємо токен
            token, created = Token.objects.get_or_create(user=user)

            return Response({
                'token': token.key,
                'user': {
                    'username': user.username,
                    'email': user.email,
                    'is_superuser': user.is_superuser
                }
            })

        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def generate_unique_username(self, email):
        """Генерує унікальний username на основі email"""
        base_username = email.split('@')[0]
        username = base_username
        counter = 1
        User = get_user_model()

        while User.objects.filter(username=username).exists():
            username = f"{base_username}_{counter}"
            counter += 1

        return username

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)