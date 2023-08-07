from accounts.user.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email','user_bio', 'is_active', 'is_professor']
        read_only_field = ['is_active']