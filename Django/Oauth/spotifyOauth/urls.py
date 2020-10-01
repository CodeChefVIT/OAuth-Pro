from django.urls import path, include
from .views import Login, AuthView

urlpatterns = [
    path('auth/', Login.as_view()),
    path('verify/', AuthView.as_view())
]
