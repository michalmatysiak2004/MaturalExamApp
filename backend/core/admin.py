from django.contrib import admin
from .models import *
# Register your models here.


admin.site.register(Course)
admin.site.register(UserCourse)
admin.site.register(Lesson)
admin.site.register(CustomUser)
admin.site.register(LessonProgress)