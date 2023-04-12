from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    AddressViewSet,
    ProfileAPIView,
    UserAPIView,
    UserLoginAPIView,
    UserRegisterationAPIView,
)

app_name = 'users'

router = DefaultRouter()
router.register(r'', AddressViewSet)

urlpatterns = [
    # path('register/', UserRegisterationAPIView.as_view(), name='user_register'),
    # path('login/', UserLoginAPIView.as_view(), name='user_login'),

    # path('', UserAPIView.as_view(), name='user_detail'),
    # path('profile/', ProfileAPIView.as_view(), name='profile_detail'),

]
