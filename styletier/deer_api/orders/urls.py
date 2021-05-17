from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('orderproduct', OrderProductViewSet)
router.register('order',  OrderViewSet)
router.register('address', AddressViewSet)
router.register('delivery', DeliveryViewSet)
router.register('cart',CartViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('kakao/', kakaoPay),
    path('paySuccess/', paySuccess)   
]