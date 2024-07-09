import json
from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
class UsernameValidationView(View):
    def post(self, request):
        data = json.loads(request.body)
        username = data['username']

        if str(username).isalnum():
            return JsonResponse({'username_error': 'username should only contain alphanumeric characters'})
        return JsonResponse({'username_valid', True})
class RegistrationView(View):
    def get(self, request):
        return render(request, 'authentication/registration.html')
