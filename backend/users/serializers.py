from django.conf import settings
from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import gettext as _
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.tokens import RefreshToken

from .exceptions import (
    AccountNotRegisteredException,
    InvalidCredentialsException,
    AccountDisabledException,
)
from .models import Address, PhoneNumber, Profile

User = get_user_model()


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'password']
#


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer class to seralize User model
    """

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'username', 'last_name', 'is_staff')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

        def create(self, validated_data):
            newUser = User(
                email=validated_data['email'],
                username=validated_data['username']
            )
            newUser.set_password(validated_data['password'])
            newUser.save()
            return newUser


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'username', 'last_name', 'token')

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ShippingAddressSerializer(serializers.ModelSerializer):
    """
    Serializer class to seralize address of type shipping

    For shipping address, automatically set address type to shipping
    """
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Address
        fields = '__all__'
        read_only_fields = ('address_type',)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['address_type'] = 'S'

        return representation


class BillingAddressSerializer(serializers.ModelSerializer):
    """
    Serializer class to seralize address of type billing

    For billing address, automatically set address type to billing
    """
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Address
        fields = '__all__'
        read_only_fields = ('address_type',)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['address_type'] = 'B'

        return representation
