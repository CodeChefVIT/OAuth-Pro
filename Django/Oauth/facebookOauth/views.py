from rest_framework.authentication import TokenAuthentication
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from dj_rest_auth.models import TokenModel
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.serializers import SocialLoginSerializer
from dj_rest_auth.registration.views import SocialLoginView

class FacebookLogin(SocialLoginView):
    serializer_class = SocialLoginSerializer
    adapter_class = FacebookOAuth2Adapter
    callback_url = 'http://127.0.0.1:8000/'
    token_model = TokenModel
    client_class = OAuth2Client