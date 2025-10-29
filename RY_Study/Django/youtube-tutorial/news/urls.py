# from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.news_home, name='news_home'),
    # path('detail/<int:news_id>/', views.detail, name='news_detail'),
    # path('create/', views.create, name='news_create'),
    # path('update/<int:news_id>/', views.update, name='news_update'),
    # path('delete/<int:news_id>/', views.delete, name='news_delete'),
    # path('search/', views.search, name='news_search'),
    # path('category/<str:category_name>/', views.category, name='news_category'),
]

