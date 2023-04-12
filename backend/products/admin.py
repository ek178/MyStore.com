from django.contrib import admin

from .models import Product, ProductCategory, ProductReview, CartProduct

admin.site.register(ProductCategory)
admin.site.register(Product)
admin.site.register(ProductReview)
admin.site.register(CartProduct)
