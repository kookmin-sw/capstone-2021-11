from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('category', CategoryViewSet)
router.register('product', ProductViewSet)
router.register('deer_product', DeerProductViewSet)
router.register('product_photo', ProductPhotoViewSet)
router.register('photo', PhotoViewSet)
router.register('deerphoto',DeerPhotoViewSet)
router.register('color',ColorViewSet)
router.register('size',SizeViewSet)
router.register('product_color', ProductColorViewSet)
router.register('product_size', ProductSizeViewSet)
router.register('product_amount', ProductAmountViewSet)
router.register('deerproduct_photo',DeerProductPhotoViewSet)

urlpatterns = [
    path('', include(router.urls)),    
]
