from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import *
app_name = 'orders'

router = DefaultRouter()

urlpatterns = [
    path('', getOrders, name="allorders"),
    path('makeorder/', addOrderItems, name="orders-add"),
    path('myorders/', getMyOrders, name="myorders"),
    path('didBuyProduct/', didBuyProduct, name="did_buy_product"),

    path('<str:pk>/deliver/', updateOrderToDelivered, name="delivered"),
    path('<str:pk>/', getOrderById, name="user-order"),
    path('<str:pk>/pay/', updateOrderToPaid, name="pay"),
]
