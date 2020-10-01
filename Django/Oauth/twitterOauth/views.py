from rest_framework.authentication import TokenAuthentication
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from dj_rest_auth.models import TokenModel
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.social_serializers import TwitterLoginSerializer
from dj_rest_auth.registration.views import SocialLoginView


class TwitterLogin(SocialLoginView):
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter
    callback_url = 'http://127.0.0.1:8000/'
    token_model = TokenModel
    client_class = OAuth2Client