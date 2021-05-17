from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from django.contrib.auth import get_user_model
from .models import Deer


User = get_user_model()


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class DeerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Deer.objects.all()
    serializer_class = DeerSerializer
