import uuid
from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator

class Course(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              related_name='courses_created',
                              on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    overview = models.TextField()
    created = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.title

class Grade(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='grades')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='grades')
    grade_score = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])

    created = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} awarded {self.grade_score}% on {self.course.title}"
    
    
class Enrolled(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='users_enrolled')
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True, blank=True)
    
    
    def __str__(self):
        return f"{self.user.username} {self.course.title}"
    
class Clas(models.Model):
    name = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)
    students = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='registered_classes', blank=True)


    def __str__(self):
        return self.name
    