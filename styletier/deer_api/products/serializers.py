from rest_framework import serializers
from .models import *


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = '__all__'


class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = '__all__'


class ProductAmountSerializer(serializers.ModelSerializer):
    color = serializers.ReadOnlyField(source='color_id.color')
    size = serializers.ReadOnlyField(source='size_id.size')
    product = serializers.ReadOnlyField(source='product_id.name')

    class Meta:
        model = ProductAmount
        fields = '__all__'


class ProductColorSerializer(serializers.ModelSerializer):
    color = serializers.ReadOnlyField(source='color_id.color')

    class Meta:
        model = ProductColor
        fields = '__all__'


class ProductSizeSerializer(serializers.ModelSerializer):
    size = serializers.ReadOnlyField(source='size_id.size')

    class Meta:
        model = ProductSize
        fields = '__all__'


class DeerPhotoSerializer(serializers.ModelSerializer):
    img = serializers.ImageField(
        source='photo_id.img', read_only=True, use_url=True)

    class Meta:
        model = DeerPhoto
        fields = '__all__'


class ProductPhotoSerializer(serializers.ModelSerializer):
    img = serializers.ImageField(
        source='photo_id.img', read_only=True, use_url=True)

    class Meta:
        model = ProductPhoto
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class DeerProductPhotoSerializer(serializers.ModelSerializer):
    img = serializers.ImageField(
        source='photo_id.img', read_only=True, use_url=True)

    class Meta:
        model = DeerProductPhoto
        fields = '__all__'


class DeerProductSerializer(serializers.ModelSerializer):
    size = serializers.CharField(source='product_id.size', read_only=True)
    stock_quantity = serializers.IntegerField(
        source='product_id.stock_quantity', read_only=True)
    price = serializers.IntegerField(source='product_id.price', read_only=True)
    deer_photo = DeerPhotoSerializer(
        source='user_id.photos', read_only=True, many=True)
    product_photo = ProductPhotoSerializer(
        source='product_id.photos', read_only=True, many=True)
    deer_name = serializers.ReadOnlyField(source='user_id.user_id.name')
    product_name = serializers.ReadOnlyField(source='product_id.name')
    deerproduct_photo = DeerProductPhotoSerializer(
        source='photos', read_only=True, many=True)

    class Meta:
        model = DeerProduct
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    deer_products = DeerProductSerializer(
        source="deerproducts", many=True, read_only=True)
    photo = ProductPhotoSerializer(source="photos", many=True, read_only=True)
    category = serializers.CharField(source="category_id.name", read_only=True)
    color = ProductColorSerializer(source="colors", read_only=True, many=True)
    size = ProductSizeSerializer(source="sizes", read_only=True, many=True)

    class Meta:
        model = Product
        fields = '__all__'
