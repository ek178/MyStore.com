from django.core import paginator
from django.http import JsonResponse
from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from rest_framework import status

# Rest Framework Import
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
import json
# Local Import
from .models import *
from .serializers import *
import  logging

@csrf_exempt
@api_view(['GET'])
def getProducts(request):
    itemsPerPage = request.query_params.get('itemsPerPage')
    query = request.query_params.get('keyword')
    category = request.query_params.get('categoryId')
    if query is None:
        query = ''

    if category == '-1':
        products = Product.objects.filter(name__icontains=query).order_by('-price')
    else:
        products = Product.objects.filter(name__icontains=query, category=category).order_by('-price')

    page = request.query_params.get('page')
    paginator = Paginator(products, itemsPerPage)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    page = int(page)

    serializer = ProductSerializer(products, many=True)
    res = {}
    res['products'] = serializer.data
    res['totalProducts'] = paginator.count

    return JsonResponse(res, status=201, safe=False)


@csrf_exempt
@api_view(['GET'])
def getCategories(request):
    categories = ProductCategory.objects.all()
    seralizer = ProductCategorySerializer(categories, many=True)
    return JsonResponse(seralizer.data, safe=False)


@csrf_exempt
@api_view(['GET'])
def getProductReview(request):
    productId = request.query_params.get('productId')
    reviews = ProductReview.objects.filter(product=productId)

    serializer = ProductReviewSerializer(reviews, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def uploadReview(request):
    user = request.user
    data = request.data

    product = Product.objects.get(name=data['product'])

    review = ProductReview.objects.create(
        product=product,
        user=user,
        rating=data['rating'],
        comment=data['comment']
    )

    serializer = ReviewSerializer(review)

    logging.info("uploaded a review from user: " + user.username)
    return JsonResponse(serializer.data, safe=False)


# Create a new Product
@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    productData = json.loads(request.data['product'])
    productImage = request.data['file']
    category = ProductCategory.objects.get(_id=productData['category'])

    product = Product.objects.create(
        price=productData['price'],
        name=productData['name'],
        description=productData['description'],
        inStock=productData['inStock'],
        image=productImage,
        category=category)

    product.save()

    logging.info("Created new product - " + productData['name'])
    serializer = ProductSerializer(product)

    return JsonResponse(serializer.data, status=201)



# Update single products


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request):
    data = request.data
    product = Product.objects.get(_id=data["_id"])
    category = ProductCategory.objects.get(name=data['category'])
    product.name = data["name"]
    product.price = data["price"]
    product.countInStock = data["inStock"]
    product.category = category
    product.description = data["description"]

    product.save()

    logging.info("Admin updated item - " + data["name"])
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


# Delete a product
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request):
    productId = request.query_params.get('productId')
    product = Product.objects.get(_id=productId)
    logging.info("Admin deleting item - " + product.name)
    product.delete()

    return Response("Product deleted successfully")


@csrf_exempt
@api_view(['post'])
def uploadFile(request):
    parser_class = (FileUploadParser,)
    file_serializer = FileSerializer(data=request.data)

    if file_serializer.is_valid():
        file_serializer.save()
        return Response(file_serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
