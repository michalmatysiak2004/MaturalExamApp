from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response

from .serializer import * 
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import get_object_or_404
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info(request):
    return Response({
        'username': request.user.username,
        'email': request.user.email,
        'is_authenticated': True
    })

class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
   
    serializer_class = UserSerializer
    permission_classes = [AllowAny]



class HomeDataView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
     
        courses = Course.objects.all()

        
        courses_serialized = CourseSerializer(courses, many=True).data

        owned_courses = []
        if request.user.is_authenticated:
            owned_courses = list(
                UserCourse.objects.filter(user=request.user).values_list('course_id', flat=True)
            )

        return Response({
            
            'courses': courses_serialized,
            'owned_courses': owned_courses,
        })
        
class CourseDataView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, courseId):
        course = Course.objects.get(id=courseId)
        serializer = CourseSerializer(course)
        if request.user.is_authenticated:
            finished_lessons = list(
                LessonProgress.objects.filter(
                    user=request.user,
                    
                    ).values_list('lesson_id', flat=True)
            ) 
        else : finished_lessons = []
            
        return Response({
            'course' : serializer.data,
            'finished_lessons' : finished_lessons
            
            })








