from rest_framework import serializers
from .models import *
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import exceptions



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        credentials = {
            'email': attrs.get('email'),
            'password': attrs.get('password')
        }

        user = authenticate(**credentials)

        if user:
            if not user.is_active:
                raise exceptions.AuthenticationFailed('User is deactivated')

            data = {}
            refresh = self.get_token(user)

            data['refresh'] = str(refresh)
            data['access'] = str(refresh.access_token)

            return data
        else:
            raise exceptions.AuthenticationFailed('No active account found with the given credentials')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        
        model = CustomUser
        fields = ["id", "email", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, data):
        print("VALIDATE:", data)  # 👈 tutaj zobaczysz wszystkie dane wejściowe
        return data

    def create(self, validated_data):
        print("CREATE:", validated_data)  # 👈 tutaj zobaczysz, co DRF zatwierdził
        user = CustomUser.objects.create_user(**validated_data)
       
        return user



class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'prize']
       

    
class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'name', 'description', 'course']
        extra_kwargs = {'course': {"read_only": True}}

class UserCourseSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Course
        fields = '__all__'





