from django.db import models
from django.contrib.auth.models import  AbstractUser


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
    time = models.IntegerField(null=True)
    def __str__(self):
        return f"Lekcja: {self.name}"
    

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email' 
    REQUIRED_FIELDS = ['username']
    def __str__(self):
        return self.username

class UserCourse(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='purchased_courses')
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    purchase_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.course.name}"
    

