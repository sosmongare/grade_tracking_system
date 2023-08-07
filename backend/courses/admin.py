from django.contrib import admin
from .models import Course, Grade, Enrolled, Clas


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['title', 'created', 'owner']
    list_filter = ['created','owner']
    search_fields = ['title', 'overview']


@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    list_display = [ 'course','user', 'grade_score']
    list_filter = ['created','user']
    search_fields = ['course', 'grade_score']

@admin.register(Enrolled)
class EnrolledAdmin(admin.ModelAdmin):
    list_display = ['course','user']
    list_filter = ['course','user']
    search_fields = ['course', 'user']

@admin.register(Clas)
class ClasAdmin(admin.ModelAdmin):
    list_display = [ 'name',]
    list_filter = ['name',]
    search_fields = ['name',]