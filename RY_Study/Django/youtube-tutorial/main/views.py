from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    data = {
        'title': 'Home',
        'content': 'Welcome to the home page!',
        'values': ['Some', 'Hello', 'World'],
        'object': {
            'name': 'John Doe',
            'age': 30,
            'city': 'New York',
            'hobbies': ['reading', 'traveling', 'coding']
        }
    }
    return render(request, 'main/index.html', data)


def about(request):
    return render(request, 'main/about.html')