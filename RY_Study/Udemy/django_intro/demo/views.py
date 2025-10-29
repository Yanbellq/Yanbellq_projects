from django.http import HttpResponse
from django.shortcuts import render
from django.views import View
from .models import Book
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import BookSerializer, BookMiniSerializer


# class Another(View):
#     output = ''
#
#     books = Book.objects.all()  # Вибирає всі записи з БД
#     for book in books:
#         output += f'We have {book.title} book in our database with id = {book.id}.<br>'
#
#
#     booksF = Book.objects.filter(is_published=True)  # Вибирає тільки по умові (фільтрує по умові)
#     for book in booksF:
#         output += f'<br><br><br>We have {book.title} book in our database with id = {book.id}.<br>'
#
#
#     book = Book.objects.get(id=1)  # Вибирає по умові тільки один запис
#     output += f'<br><br><br>We have {book.title} book in our database with id = {book.id}.<br>'
#
#
#     def get(self, request):
#         return HttpResponse(self.output)

def first(request):

    books = Book.objects.all()

    return render(request, 'index.html', {'books': books})


class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookMiniSerializer
    queryset = Book.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = BookSerializer(instance)
        return Response(serializer.data)