from django.shortcuts import render, redirect
from .models import *
from .serializers import *
from .filters import *
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model

from pathlib import Path
import requests
import json
import os
import sys


User = get_user_model()

BASE_DIR = Path(__file__).resolve().parent.parent
secret_path = os.path.join(BASE_DIR, 'secret/secret.json')
with open(secret_path) as f:
    secrets = json.loads(f.read())


def get_secret(setting, secrets=secrets):
    try:
        return secrets[setting]
    except KeyError:
        error_msg = f"Set the {setting} enviroment variable."
        raise ImproperlyConfigured(error_msg)


KAKAO_ADMIN_KEY = get_secret("KAKAO_ADMIN_KEY")


class OrderProductViewSet(viewsets.ModelViewSet):
    queryset = OrderProduct.objects.all()
    serializer_class = OrderProductSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filter_class = OrderFilter

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        cart_list = request.data['cart_id']
        for cart_id in cart_list:
            cart = Cart.objects.get(id=cart_id)
            order = Order.objects.get(id=serializer.data['id'])
            orderproduct = OrderProduct(order_id=order, product_id=cart.product_id,
                                        quantity=cart.quantity, size=cart.size, color=cart.color)
            orderproduct.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=False, methods=['GET'])
    def getPayList(self, request, *args, **kwargs):
        user_id = request.data['user_id']
        no_pay = self.get_queryset().filter(user_id=user_id).filter(status="미입금")
        finished = self.get_queryset().filter(user_id=user_id).filter(status="결제완료")
        return Response({'non_payment': len(no_pay), 'finised_payment': len(finished)}, status=status.HTTP_200_OK)


class DeliveryViewSet(viewsets.ModelViewSet):
    queryset = Delivery.objects.all()
    serializer_class = DeliverySerializer

    @action(detail=False, methods=['GET'])
    def getDeliveryList(self, request, *args, **kwargs):
        user_id = request.data['user_id']
        no_pay = self.get_queryset().filter(user_id=user_id).filter(status="미입금")
        finished = self.get_queryset().filter(user_id=user_id).filter(status="결제완료")
        return Response({'non_payment': len(no_pay), 'finised_payment': len(finished)}, status=status.HTTP_200_OK)


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    filter_class = CartFilter

    def create(self, request, *args, **kwargs):
        product_id = request.data['product_id']
        user = request.data['user_id']
        if Cart.objects.filter(user_id=user).filter(product_id=product_id).exists():
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=False, methods=['post'])
    def deletePayment(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        user_id = request.data['user_id']
        product_id = request.data['product_id']
        cart = queryset.filter(user_id=user_id).get(product_id=product_id)
        cart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# kakao payment API


@api_view(['post'])
def kakaoPay(request):
    print("데이터", request.data)
    if(request.method == 'POST'):
        order = request.data['order_id']
        url = "https://kapi.kakao.com"
        headers = {
            'Authorization': "KakaoAK " + KAKAO_ADMIN_KEY,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        }
        params = {
            'cid': "TC0ONETIME",
            'partner_order_id': order,
            'partner_user_id': request.data['user_id'],
            'item_name': request.data['name'],
            'quantity': request.data['quantity'],
            'total_amount': request.data['total_amount'],
            'vat_amount': 400,
            'tax_free_amount': 0,
            'approval_url': f'http://styletier.com/approve/{order}',
            'fail_url': 'http://styletier.com',
            'cancel_url': 'http://styletier.com',
        }
        response = requests.post(
            url+"/v1/payment/ready", params=params, headers=headers)
        print('2', response)
        response = json.loads(response.text)
        print('1', response)
        return Response(response)


@api_view(['post'])
def paySuccess(request):
    url = "https://kapi.kakao.com"
    print('리퀘스트', request.data)
    headers = {
        'Authorization': "KakaoAK " + KAKAO_ADMIN_KEY,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    }
    params = {
        'cid': 'TC0ONETIME',
        'tid': request.data['tid'],
        'partner_order_id': request.data['order_id'],
        'partner_user_id': request.data['user_id'],
        'pg_token': request.data['pg_token']
    }
    res = requests.post(url+"/v1/payment/approve",
                        data=params, headers=headers)
    result = res.json()
    return Response(result)
    # * 사용하는 프레임워크별 코드를 수정하여 배포하는 방법도 있지만
    #   Req Header를 통해 분기하는 것을 추천
    # - Django 등 적용 시
    # return render(request, 'paySuccess.html')
    # - React 적용 시
