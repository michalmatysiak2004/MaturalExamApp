from django.db import models
from django.contrib.auth.models import User, AbstractUser
# Create your models here.

class Course(models.Model): 
    name = models.CharField(max_length = 200)
    description = models.CharField(max_length = 300)
    prize = models.CharField(null = True)

    def __str__(self):
        return f"Kurs: {self.name}"

class Lesson(models.Model):
    name = models.CharField(max_length = 200)
    description = models.CharField(max_length = 300)
    course = models.ForeignKey(Course, on_delete= models.CASCADE, related_name = "belongto")
    def __str__(self):
        return f"Lekcja: {self.name}"
    

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self):
        self.username

class UserCourse(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='purchased_courses')
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    purchase_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.course.name}"
    

