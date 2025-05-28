from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User



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
        user = User.objects.create_user(**validated_data)
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





