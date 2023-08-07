from django.shortcuts import render, get_object_or_404 
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.parsers import MultiPartParser, FormParser
from django.core import serializers
from .permissions import IsOwnerOrReadOnly #new
from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework import generics,  permissions, authentication
from accounts.user.models import User

from courses.models import Course, Grade, Enrolled

from courses.api.serializers import CourseSerializer, GradeSerializer, EnrolledSerializer
from rest_framework import filters

from rest_framework.decorators import action
from rest_framework.response import Response


import django_filters
#viewsets
class DefaultsMixin(object):
#Default settings for view authentication, permissions, filtering and pagination."""

   # authentication_classes = ( 
     #   authentication.BasicAuthentication, 
       # authentication.TokenAuthentication,
   #)
    #permission_classes = (
       # permissions.IsAuthenticated, 
    #)
    paginate_by = 25 
    paginate_by_param = 'page_size' 
    max_paginate_by = 100 
    filter_backends = (
        DjangoFilterBackend, 
        filters.SearchFilter, 
        filters.OrderingFilter,
)
 
#permission_classes = [IsAuthenticated]
class CourseViewSet(DefaultsMixin, viewsets.ModelViewSet):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = ( IsOwnerOrReadOnly,)
    queryset = Course.objects.order_by('created')
    
    serializer_class = CourseSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        course = serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def get_queryset(self):
        queryset = Course.objects.order_by('created')
        owner_id = self.request.query_params.get('owner')
        if owner_id:
            queryset = queryset.filter(owner_id=owner_id)
        return queryset
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer

class EnrolledViewSet(DefaultsMixin,viewsets.ModelViewSet):
    permission_classes = (IsOwnerOrReadOnly,)
    queryset = Enrolled.objects.all()
    serializer_class = EnrolledSerializer