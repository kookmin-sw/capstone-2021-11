from django.db import models
from products.models import Product,Color,Size
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()

class Cart(models.Model):
    user_id = models.ForeignKey(User,on_delete=models.CASCADE, related_name="carts")
    product_id = models.ForeignKey(Product,on_delete=models.CASCADE,related_name="carts")
    size = models.CharField(max_length=10,null=True,blank=True)
    color = models.CharField(max_length=10,null=True,blank=True)
    quantity = models.PositiveIntegerField()
  


class Order(models.Model):

    NON_DEPOSIT = '미입금'
    PAYMENT_FINISHED = '결제완료'
    RELEASE = '출고'
    DELIVERY_COMPLETED = '배송완료'
    RETURNING = '반송중'
    RETURN_COMPLETED = '반송완료'
    EXCHANGE_COMPLETED = '교환완료'
    REFUND_COMPLETED = '환불완료'
    STATUS =(
        (NON_DEPOSIT,'NON_DEPOSIT'),
        (PAYMENT_FINISHED,'PAYMENT_FINISHED'),
        (RELEASE,'RELEASE'),
        (DELIVERY_COMPLETED,'DELIVERY_COMPLETED'),
        (RETURNING,'RETURNING'),
        (RETURN_COMPLETED,'RETURN_COMPLETED'),
        (EXCHANGE_COMPLETED,'EXCHANGE_COMPLETED'),
        (REFUND_COMPLETED,'REFUND_COMPLETED'),
    )
    KAKAO = 'KAKAO'
    CASH = 'CASH'
    STAT =(
        (KAKAO,'KAKAO'),
        (CASH,'CASH'),
    )
    user_id = models.ForeignKey(User,on_delete=models.CASCADE, related_name="order")
    create_date =models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length = 20, choices=STATUS, default=NON_DEPOSIT)
    pay_method = models.CharField(max_length = 20, choices=STAT, default=CASH,null=True,blank=True)
    total_amount = models.PositiveIntegerField(default = 0)
    tid = models.CharField(max_length = 300, null =True, blank = True)
class Address(models.Model):
    REGION = '지명'
    ROAD = '도로명'
    REGION_ADDR = '지번 주소' 
    ROAD_ADDR = '도로명 주소'
    TYPE = (
        (REGION,'REGION'),
        (ROAD,'ROAD'),
        (REGION_ADDR,'REGION_ADDR'),
        (ROAD_ADDR,'ROAD_ADDR')
    )
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True,related_name="addresses")
    address_name = models.CharField(max_length=300,null=True,blank=True)
    address_type = models.CharField(max_length=11,choices=TYPE,null=True,blank=True, default=ROAD_ADDR) 
    zipcode = models.CharField(max_length=100,null=True,blank=True)
    detail = models.CharField(max_length=200,null=True,blank=True)

class Delivery(models.Model):
    NON_RELEASE = '미출고'
    RELEASE = '출고' 
    DELIVERY_COMPLETED = '배송완료'
    DELIVERING = '배송중'
    STATUS =(
        (NON_RELEASE,'NON_RELEASE'),
        (RELEASE,'RELEASE'),
        (DELIVERY_COMPLETED,'DELIVERY_COMPLETED'),
        (DELIVERING,'DELIVERING'),
    )
    delivery_type = models.CharField(max_length=20,choices=STATUS,default=NON_RELEASE)
    order_id = models.OneToOneField(Order,on_delete=models.CASCADE, related_name="delivery")
    message = models.CharField(max_length=100, null=True, blank=True)
    address =models.ForeignKey(Address,on_delete=models.CASCADE,related_name="delivery")

class OrderProduct(models.Model):
    order_id = models.ForeignKey(Order,on_delete=models.CASCADE,related_name="order_products")
    product_id = models.ForeignKey(Product,on_delete=models.CASCADE,related_name="order_products")
    quantity = models.PositiveIntegerField(default=1)
    size = models.CharField(max_length=10,null=True,blank=True)
    color = models.CharField(max_length=10,null=True,blank=True)
