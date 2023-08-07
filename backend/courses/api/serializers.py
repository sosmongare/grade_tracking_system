from datetime import date
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers 

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist

from django.contrib.auth import get_user_model

from courses.models import Course, Grade, Enrolled

User = get_user_model()

class CourseSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    owner_id = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    class Meta:
        model = Course
        fields = '__all__'

    def create(self, validated_data):
        course = Course.objects.create(**validated_data)

        return course

    def get_username(self, obj):
        user = obj.owner
        return user.username if user else None

    def get_owner_id(self, obj):
        user = obj.owner
        return user.id if user else None
    
    
class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'

class EnrolledSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        default=serializers.CurrentUserDefault(),
        queryset=User.objects.all()
    )
    
    class Meta:
        model = Enrolled
        fields = '__all__'