from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.models import TokenModel
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.serializers import SocialLoginSerializer
from dj_rest_auth.views import LoginView
from rest_framework import status


class GoogleLogin(LoginView):
    permission_classes = ()
    adapter_class = GoogleOAuth2Adapter
    serializer_class = SocialLoginSerializer
    callback_url = 'http://127.0.0.1:8000/'
    token_model = TokenModel
    client_class = OAuth2Client
