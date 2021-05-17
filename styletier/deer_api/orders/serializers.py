from rest_framework import serializers
from .models import *
from products.serializers import ProductPhotoSerializer


class OrderProductSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source = 'product_id.name')
    product_content = serializers.ReadOnlyField(source = 'product_id.content')
    product_category = serializers.ReadOnlyField(source = 'product_id.category_id.name')
    product_price = serializers.ReadOnlyField(source = 'product_id.price')
    product_photo = ProductPhotoSerializer(source = "product_id.photos",many = True,read_only=True)
    class Meta:
        model = OrderProduct
        fields = '__all__'
class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
class DeliverySerializer(serializers.ModelSerializer):
    address_name = serializers.ReadOnlyField(source="address.address_name")
    zipcode = serializers.ReadOnlyField(source = "address.zipcode")
    address_detail = serializers.ReadOnlyField(source = "address.detail")
    class Meta:
        model = Delivery
        fields = '__all__'
class OrderSerializer(serializers.ModelSerializer):
    orderproduct = OrderProductSerializer(source = "order_products",many =True ,read_only=True)
    deliveries = DeliverySerializer(source="delivery", read_only=True)
    class Meta:
        model = Order
        fields = ['id','user_id','create_date','status','orderproduct','deliveries','total_amount']

class CartSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source = 'product_id.name')
    product_content = serializers.ReadOnlyField(source = 'product_id.content')
    category = serializers.ReadOnlyField(source = 'product_id.category_id.name')
    price = serializers.ReadOnlyField(source = 'product_id.price')
    photo = ProductPhotoSerializer(source = "product_id.photos",many = True,read_only=True)
    class Meta:
        model = Cart
        fields = ['id','user_id','product_id','size','color','quantity','price',
        'product_content','product_name','category','photo']