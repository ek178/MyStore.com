from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
app_name = 'products'

router = DefaultRouter()

urlpatterns = [
    path('', getProducts, name="products"),

    path('create/', createProduct, name="create_product"),
    path('categories/', getCategories, name="product_categories"),
    path('create/uploadPicture/', uploadFile),
    path('product/reviews/', getProductReview, name="product_reivew"),
    path('product/uploadReview/', uploadReview, name="product_reivew"),
    # path('upload/', uploadImage, name="upload_image"),
    #
    # path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
    # path('top/', views.getTopProducts, name="top-products"),
    # path('<str:pk>/', getProduct, name="product"),
    #
    # path('update/<str:pk>/', views.updateProduct, name="update_product"),
    # path('delete/<str:pk>/', views.deleteProduct, name="delete_product"),
]
