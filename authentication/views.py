import json
from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
from django.contrib.auth.models import User
from validate_email import validate_email


class EmailValidationView(View):
    def post(self, request):
        data = json.loads(request.body)
        email = data['email']

# check whether email is valid
        if not  validate_email(email):
            return JsonResponse({'email_error': 'Invalid Email'}, status = 400)        
        if User.objects.filter(email=email).exists():
            return JsonResponse({'email_error': 'email taken, choose another one'}, status = 409) 
        return JsonResponse({'email_valid': True})
class UsernameValidationView(View):
    def post(self, request):
        data = json.loads(request.body)
        username = data['username']

# check whether username is valid
        if not  str(username).isalnum():
            return JsonResponse({'username_error': 'special characters or spaces not allowed'}, status = 400)        
        if User.objects.filter(username=username).exists():
            return JsonResponse({'username_error': 'username taken, choose another one'}, status = 409) 
        return JsonResponse({'username_valid': True})
    
class RegistrationView(View):
    def get(self, request):
        return render(request, 'authentication/registration.html')
