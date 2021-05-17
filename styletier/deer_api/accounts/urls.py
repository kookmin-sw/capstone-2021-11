from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('user', UserViewSet)
router.register('deer',DeerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
