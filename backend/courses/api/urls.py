from django.urls import path, include
from rest_framework import routers


from . import views

router = routers.DefaultRouter()

router.register('courses', views.CourseViewSet, basename='courses')
router.register('grades', views.GradeViewSet, basename='grades')
router.register('enrolled', views.EnrolledViewSet)

app_name = 'courses'
urlpatterns = [
     path('', include(router.urls)),
]