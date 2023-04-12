from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from .views import *

app_name = 'users'

router = DefaultRouter()
# router.register(r'', AddressViewSet)

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', getUserProfile,name="user_profile"),

    # path('auth/', obtain_auth_token)

    # path('', UserAPIView.as_view(), name='user_detail'),
    # path('profile/', ProfileAPIView.as_view(), name='profile_detail'),
    # path('profile/address/', include(router.urls)),

]
