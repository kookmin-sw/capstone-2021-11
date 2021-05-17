import django_filters
from .models import * 

class CartFilter(django_filters.FilterSet):
    class Meta:
        model =  Cart
        fields = '__all__'

class OrderFilter(django_filters.FilterSet):
    class Meta:
        model =  Order
        fields = '__all__'