from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()


def category_image_path(instance, filename):
    return f'product/category/icons/{instance.name}/{filename}'


def product_image_path(instance, filename):
    return f'product/images/{instance.name}/{filename}'


class ProductCategory(models.Model):
    name = models.CharField(max_length=200)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Product Category')
        verbose_name_plural = _('Product Categories')

    def __str__(self):
        return self.name


def get_default_product_category():
    return ProductCategory.objects.get_or_create(name='Others')[0]


class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(_('Description'), blank=True)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    inStock = models.BooleanField(default=1)
    category = models.ForeignKey(
        ProductCategory, related_name="product_list", on_delete=models.SET(get_default_product_category))
    image = models.ImageField(upload_to=product_image_path, blank=True, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True,editable=False)

    class Meta:
        ordering = ('-createdAt',)

    def __str__(self):
        return self.name + " | " + str(self.price)


class CartProduct(models.Model):
    # username = models.ForeignKey(User, "username", on_delete=models.CASCADE)
    product = models.ForeignKey(
        Product, related_name="product", on_delete=models.CASCADE)
    amount = models.IntegerField(default=1)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Cart product')

    def __str__(self):
        return self.product


class ProductReview(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)


class File(models.Model):
    file = models.FileField(blank=False, null=False)
    def __str__(self):
        return self.file.name