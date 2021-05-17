import django_filters
from .models import * 

class CategoryFilter(django_filters.FilterSet):

    class Meta:
        model =  Category
        fields = '__all__'

class ProductFilter(django_filters.FilterSet):
    category_id = django_filters.NumberFilter(field_name="category_id__id")
    class Meta:
        model =  Product
        fields = '__all__'


class DeerProductFilter(django_filters.FilterSet):
    user_id = django_filters.NumberFilter(field_name="user_id__id")
    product_id = django_filters.NumberFilter(field_name="product_id__id")

    class Meta:
        model =  DeerProduct
        fields = '__all__'
        exclude = ['video_url']

class ProductPhotoFilter(django_filters.FilterSet):
    product_id = django_filters.NumberFilter(field_name="product_id__id")

    class Meta:
        model =  ProductPhoto
        fields = '__all__'

class ProductAmountFilter(django_filters.FilterSet):
    class Meta:
        model =  ProductAmount
        fields = '__all__'
