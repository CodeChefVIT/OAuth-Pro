from rest_framework.authentication import TokenAuthentication
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from dj_rest_auth.models import TokenModel
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.serializers import SocialLoginSerializer
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework import status


class GithubLogin(SocialLoginView):
    adapter_class = GitHubOAuth2Adapter
    serializer_class = SocialLoginSerializer
    callback_url = 'http://127.0.0.1:8000/'
    token_model = TokenModel
    client_class = OAuth2Client