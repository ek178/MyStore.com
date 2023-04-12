import { Product} from '../app/pages/my-shop/services/products.service';
// export const products: Product[] = [
//     {
//         name: 'water',
//         description: 'this is another descript54 his productth eth is anoeth eth tht ehther description for this productthis is anoeth eth tht ehther description for this product hdhh  htttrh ion for this product',
//         imageSrc: imageSrc('5'),
//         price: 9,
//         inStock: true,
//         category: category.FOOD,
//         reviews: [],
//     },
//     {
//         name: 'orange',
//         description: 'this is another descripti hdthtrhth rh th on for this product',
//         imageSrc: imageSrc('3'),
//         price: 24654,
//         inStock: true,
//         category: category.FOOD,
//         reviews: []
//     },
//     {
//         name: 'life',
//         description: '',
//         imageSrc: imageSrc('4'),
//         price: 0,
//         inStock: true,
//         category: category.FOOD,
//         reviews: []
//     },
//     {
//         name: 'Two',
//         description: 'this is et t description for this product',
//         imageSrc: imageSrc('1'),
//         price: 54,
//         inStock: true,
//         category: category.FOOD,
//         reviews: []
//     },
//     {
//         name: 'chocolate',
//         description: 'this is another etrhtrh for this product',
//         imageSrc: imageSrc('0'),
//         price: 44444444,
//         inStock: true,
//         category: category.FOOD,
//         reviews: []
//     },
//     {
//         name: 'coco',
//         description: 'this is another deetrh scriondescri criptionthis is anoeth eth tht ehther description for this productthis is anoeth eth tht ehther description for this productthis is anoeth eth tht ehther description for this productthis is anoeth eth tht ehther description for this productdescript iondescript iondescriptiondescr iptiondesc riptiondes criptiondes cript iondescription for this product',
//         imageSrc: imageSrc('4'),
//         price: 9,
//         inStock: true,
//         category: category.FOOD,
//         reviews: []
//     },
//     {
//         name: 'time',
//         description: 'this is anoeth eth tht ehther description for this productthis is anoeth eth tht ehther description for this productthis is anoeth eth tht ehther description for this productthis is anoeth eth tht ehther description for this productthis is anoeth eth tht ehther description for this productthis is anoeth eth tht ehther description for this product',
//         imageSrc: imageSrc('8'),
//         price: 100,
//         inStock: true,
//         category: category.FOOD,
//         reviews: []
//     },
//     {
//         name: 'something',
//         description: 'this is another product',
//         imageSrc: imageSrc('7'),
//         price: 9,
//         inStock: true,
//         category: category.FOOD,
//         reviews: []
//     },
//     {
//         name: 'whatever',
//         description: 'this ct',
//         imageSrc: imageSrc('5'),
//         price: 4,
//         inStock: true,
//         category: category.FOOD,
//         reviews: []
//     },
//     {
//         name: 'burekus',
//         description: 'this is another description for this product',
//         imageSrc: imageSrc('7'),
//         price: 122,
//         inStock: true,
//         category: category.FOOD,
//         reviews: []
//     },
//     {
//         name: 'water22',
//         description: 'this is another descript54 his productth eth is anoeth eth tht ehther description for this productthis is anoeth eth tht ehther description for this product hdhh  htttrh ion for this product',
//         imageSrc: imageSrc('5'),
//         price: 9,
//         inStock: true,
//         category: category.FOOD,
//         reviews: []
//     },
//     {
//         name: 'orange22',
//         description: 'this is another descripti hdthtrhth rh th on for this product',
//         imageSrc: imageSrc('3'),
//         price: 24654,
//         inStock: true,
//         category: category.FOOD,
//         reviews: []
//     },
//     {
//         name: 'life22',
//         description: '',
//         imageSrc: imageSrc('4'),
//         price: 0,
//         inStock: true,
//         category: category.FOOD,
//         reviews: []
//     },
//     {
//         name: 'Two22',
//         description: 'this is et t description for this product',
//         imageSrc: imageSrc('1'),
//         price: 54,
//         inStock: true,
//         category: category.FOOD,
//         reviews: []
//     },
//     {
//         name: 'chocolate22',
//         description: 'this is another etrhtrh for this product',
//         imageSrc: imageSrc('0'),
//         price: 44444444,
//         inStock: true,
//         category: category.FOOD,
//         reviews: []
//     },
//     {
//         name: 'coco22',
//         description: 'this is another deetrh scriondescri criptionthis is anoeth eth tht ehther description for this productthis is anoeth eth tht ehther description for this productthis is anoeth eth tht ehther description for this productthis is anoeth eth tht ehther description for this productdescript iondescript iondescriptiondescr iptiondesc riptiondes criptiondes cript iondescription for this product',
//         imageSrc: imageSrc('4'),
//         price: 9,
//         inStock: true,
//         category: category.FOOD,
//         reviews: []
//     },
//     {
//         name: 'time22',
//         description: 'this is anoeth eth tht ehther description for this productthis is anoeth eth tht ehther description for this productthis is anoeth eth tht ehther description for this productthis is anoeth eth tht ehther description for this productthis is anoeth eth tht ehther description for this productthis is anoeth eth tht ehther description for this product',
//         imageSrc: imageSrc('8'),
//         price: 100,
//         inStock: true,
//         category: category.FOOD,
//         reviews: []
//     },
//     {
//         name: 'something22',
//         description: 'this is another product',
//         imageSrc: imageSrc('7'),
//         price: 9,
//         inStock: true,
//         category: category.FOOD,
//         reviews: []
//     },
//     {
//         name: 'whatever22',
//         description: 'this ct',
//         imageSrc: imageSrc('5'),
//         price: 4,
//         inStock: true,
//         category: category.FOOD,
//         reviews: []
//     },
//     {
//         name: 'burekus22',
//         description: 'this is another description for this product',
//         imageSrc: imageSrc('7'),
//         price: 122,
//         inStock: true,
//         category: category.FOOD,
//         reviews: []
//     }
// ];

function imageSrc(srcName: string): string {
    return `assets/img/demo/${srcName}.jpg`;
}
