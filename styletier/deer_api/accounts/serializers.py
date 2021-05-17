from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_auth.registration.serializers import RegisterSerializer
from .models import Deer
from products.serializers import DeerPhotoSerializer
User = get_user_model()



class RegisterSerializer(RegisterSerializer):
    username = None
    name = serializers.CharField()
    phone_num = serializers.CharField()
    address = serializers.CharField()
    postal_code = serializers.CharField()

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'name': self.validated_data.get('name', ''),
            'phone_num': self.validated_data.get('phone_num', ''),
            'address': self.validated_data.get('address', ''),
            'postal_code': self.validated_data.get('postal_code', ''),
        }

class DeerSerializer(serializers.ModelSerializer):
    deer_img = DeerPhotoSerializer(source="photos",read_only=True,many = True)
    username = serializers.ReadOnlyField(source="user_id.name")
    email = serializers.EmailField(source="user_id.email",read_only=True)
    class Meta:
        model = Deer
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    deeruser = DeerSerializer(source="deer",read_only=True)
    class Meta:
        model = User
        fields = ['id','email','name','phone_num','address','postal_code','deeruser', 'height', 'weight']


