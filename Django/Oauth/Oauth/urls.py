from django.contrib import admin
from django.urls import path ,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('google/',include('googleOauth.urls')),
    path('twitter/',include('twitterOauth.urls')),
    path('facebook/',include('facebookOauth.urls')),
    path('linkedin/',include('linkedinOauth.urls')),
    path('github/',include('githubOauth.urls')),

]
