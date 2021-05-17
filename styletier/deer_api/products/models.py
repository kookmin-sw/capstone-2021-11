from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
from accounts.models import Deer

User = get_user_model()

# 카테고리 테이블


class Category(models.Model):
    name = models.CharField(max_length=40, null=False)
    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, blank=True, null=True)  # 계층관계 필드

    def __str__(self):
        return self.name


class Color(models.Model):
    color = models.CharField(max_length=50)

    def __str__(self):
        return self.color


class Size(models.Model):
    size = models.CharField(max_length=5)

    def __str__(self):
        return self.size
# 상품 테이블


class Product(models.Model):
    name = models.CharField(max_length=40, null=False)
    status = models.PositiveIntegerField(blank=True, null=True)  # 제품 상태
    best_prod = models.PositiveIntegerField(blank=True, null=True)
    new_prod = models.PositiveIntegerField(blank=True, null=True)
    price = models.IntegerField(blank=True)
    content = models.TextField(null=False)
    stock_quantity = models.IntegerField(blank=True)
    category_id = models.ForeignKey(
        Category, null=False, on_delete=models.CASCADE, related_name="products")
    register_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

    def total_quantity(self):
        count = 0
        for i in self.amount:
            count += i.total
        return count


class DeerProduct(models.Model):
    user_id = models.ForeignKey(
        Deer, on_delete=models.CASCADE, related_name="deerproducts")
    product_id = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="deerproducts")
    sales_quantity = models.PositiveIntegerField(default=0)
    target_quantity = models.PositiveIntegerField(default=0)
    video_url = models.FileField(
        upload_to='deerproduct/', blank=True, null=True)
    content = models.TextField(null=True, blank=True)
    scription = models.TextField(null=True, blank=True)
    youtube_url = models.URLField(max_length=300, null=True, blank=True)
    create_date = models.DateTimeField(default=timezone.now)
    update_date = models.DateTimeField(default=timezone.now)


class Photo(models.Model):
    title = models.CharField(max_length=100, null=True, blank=True)
    img = models.ImageField(upload_to='photo/')

    def __str__(self):
        return self.title


class ProductPhoto(models.Model):
    photo_id = models.ForeignKey(Photo, on_delete=models.CASCADE)
    product_id = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="photos")
    is_main = models.BooleanField(default=False, null=True, blank=True)


class DeerPhoto(models.Model):
    user_id = models.ForeignKey(
        Deer, on_delete=models.CASCADE, related_name="photos")
    photo_id = models.ForeignKey(Photo, on_delete=models.CASCADE)


class DeerProductPhoto(models.Model):
    deerprdouct_id = models.ForeignKey(
        DeerProduct, on_delete=models.CASCADE, related_name="photos")
    photo_id = models.ForeignKey(Photo, on_delete=models.CASCADE)
    is_main = models.BooleanField(default=False, null=True, blank=True)


class ProductColor(models.Model):
    product_id = models.ForeignKey(
        Product,  on_delete=models.CASCADE, related_name="colors")
    color_id = models.ForeignKey(Color, on_delete=models.CASCADE)


class ProductSize(models.Model):
    product_id = models.ForeignKey(
        Product,  on_delete=models.CASCADE, related_name="sizes")
    size_id = models.ForeignKey(Size, on_delete=models.CASCADE)


class ProductAmount(models.Model):
    product_id = models.ForeignKey(
        Product,  on_delete=models.CASCADE, related_name="amount")
    size_id = models.ForeignKey(Size, on_delete=models.CASCADE)
    color_id = models.ForeignKey(Color, on_delete=models.CASCADE)
    total = models.PositiveIntegerField(default=0)

    def sold_out(self):
        return False if self.total == 0 else True
