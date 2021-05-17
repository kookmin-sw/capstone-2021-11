from django.db.models import query
from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import action

#from rest_framework.authentication import TokenAuthentication
#from rest_framework.permissions import IsAuthenticatedßß
import json

from rest_framework.response import Response

#from rest_framework.authentication import TokenAuthentication
#from rest_framework.permissions import IsAuthenticatedßß

from .models import *
from .serializers import *
from .filters import *


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_class = CategoryFilter
    #permission_classes = [IsAuthenticated]
    #authentication_classes = [TokenAuthentication]
    # def perform_create(self, serializer):
    #    serializer.save(user=self.request.user)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_class = ProductFilter
    #permission_classes = [IsAuthenticated]
    #authentication_classes = [TokenAuthentication]

    @action(detail=False, methods=['GET'])
    def get_new_product(self, request, *args, **kwargs):
        queryset = self.get_queryset().order_by(
            'new_prod').exclude(new_prod__isnull=True)
        serializer = self.get_serializer(data=queryset, many=True)
        serializer.is_valid()
        return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def get_best_product(self, request, *args, **kwargs):
        queryset = self.get_queryset().order_by(
            'best_prod').exclude(best_prod__isnull=True)
        serializer = self.get_serializer(data=queryset, many=True)
        serializer.is_valid()
        return Response(serializer.data)


class DeerProductViewSet(viewsets.ModelViewSet):
    queryset = DeerProduct.objects.all()
    serializer_class = DeerProductSerializer
    filter_class = DeerProductFilter


class DeerProductPhotoViewSet(viewsets.ModelViewSet):
    queryset = DeerProductPhoto.objects.all()
    serializer_class = DeerProductPhotoSerializer


class ProductPhotoViewSet(viewsets.ModelViewSet):
    queryset = ProductPhoto.objects.all()
    serializer_class = ProductPhotoSerializer
    filter_class = ProductPhotoFilter


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


class DeerPhotoViewSet(viewsets.ModelViewSet):
    queryset = DeerPhoto.objects.all()
    serializer_class = DeerPhotoSerializer


class ColorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer


class SizeViewSet(viewsets.ModelViewSet):
    queryset = Size.objects.all()
    serializer_class = SizeSerializer


class ProductColorViewSet(viewsets.ModelViewSet):
    queryset = ProductColor.objects.all()
    serializer_class = ProductColorSerializer


class ProductSizeViewSet(viewsets.ModelViewSet):
    queryset = ProductSize.objects.all()
    serializer_class = ProductSizeSerializer


class ProductAmountViewSet(viewsets.ModelViewSet):
    queryset = ProductAmount.objects.all()
    serializer_class = ProductAmountSerializer
    filter_class = ProductAmountFilter

    @action(detail=False, methods=['post'])
    def reduce_quantity(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        product_id = request.data['product_id']
        color = request.data['color']
        size = request.data['size']
        color_id = Color.objects.get(color=color)
        size_id = Size.objects.get(size=size)
        print("색깔이랑,사이즈랑", color_id, size_id)
        qs = queryset.filter(product_id=product_id).filter(
            color_id=color_id.id).get(size_id=size_id.id)
        print("qs", qs)
        qs.total = qs.total - int(request.data['quantity'])
        qs.save()
        if qs.sold_out():
            return Response({'sold_out': "품절"})
        else:
            return Response({'success': "성공"})
