# Generated by Django 4.2 on 2023-04-11 14:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import products.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='product',
            options={'ordering': ('-createdAt',)},
        ),
        migrations.RenameField(
            model_name='product',
            old_name='created_at',
            new_name='createdAt',
        ),
        migrations.RenameField(
            model_name='product',
            old_name='desc',
            new_name='description',
        ),
        migrations.RemoveField(
            model_name='product',
            name='id',
        ),
        migrations.RemoveField(
            model_name='product',
            name='quantity',
        ),
        migrations.RemoveField(
            model_name='product',
            name='seller',
        ),
        migrations.RemoveField(
            model_name='product',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='productcategory',
            name='icon',
        ),
        migrations.AddField(
            model_name='product',
            name='_id',
            field=models.AutoField(default=0, editable=False, primary_key=True, serialize=False),
        ),
        migrations.AddField(
            model_name='product',
            name='inStock',
            field=models.BooleanField(default=1),
        ),
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=products.models.product_image_path),
        ),
        migrations.AlterField(
            model_name='productcategory',
            name='name',
            field=models.CharField(max_length=200),
        ),
        migrations.CreateModel(
            name='ProductReview',
            fields=[
                ('rating', models.IntegerField(blank=True, default=0, null=True)),
                ('comment', models.TextField(blank=True, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='products.product')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CartProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.IntegerField(default=1)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product', to='products.product')),
            ],
            options={
                'verbose_name': 'Cart product',
            },
        ),
    ]
