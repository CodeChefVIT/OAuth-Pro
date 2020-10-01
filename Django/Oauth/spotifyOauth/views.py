from django.shortcuts import render
from rest_framework import APIView
from rest_framework.views import Response
import environ, os, requests, json
import urllib.request
from django.shortcuts import redirect

env = environ.Env(
    DEBUG = (bool, False)
)
environ.Env.read_env()

# Create your views here.
class Login(APIView):
    def get(self, request):

        redirect_uri = "https://www.google.co.in/"

        # State is used to prevent any CSRF attacks. 
        # Should be sent from the frontend while calling this endpoint
        # State can be any random string
        state = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

        params = {
            "client_id" : env('CLIENT_ID'),
            "response_type" : "code",
            "redirect_uri" : redirect_uri,
            "scope" : "user-read-private user-read-email",
            "state" : state
        }

        r = requests.head('https://accounts.spotify.com/authorize', params = params, allow_redirects= False)
        return Response(r.headers['location'], status = 200)

class AuthView(APIView):
    def post(self, request):
        code = request.data["code"]
        redirect_uri = "https://www.google.co.in/"

        params = {
            "grant_type" : "authorization_code",
            "code" : code,
            "redirect_uri" : redirect_uri,
            "client_id" : env('CLIENT_ID'),
            "client_secret" : env('CLIENT_SECRET')
        }

        headers = {'content-type' : 'application/x-www-form-urlencoded'}
        r = requests.post('https://accounts.spotify.com/api/token', params = params, headers = headers)
        return Response(json.loads(r.content), status = r.status_code)

