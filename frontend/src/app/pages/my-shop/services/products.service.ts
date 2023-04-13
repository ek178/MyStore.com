import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConstantsService} from './constant.service';
import {SocketIoService} from './socket-io.service';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {UsersService} from './users.service';
import {ProductCategory} from '../../../models/Category';
import {Params} from '@angular/router';
import {OrderItem} from './shopping-cart.service';
import {ProductReview} from '../../../models/ProductReview';

class Review {
    constructor(public score: number, public text: string, public username: string) {
    }
}

export interface Product {
    _id?: number;
    name: string;
    description: string;
    image: any;
    price: number;
    inStock: boolean;
    category: string;
}


export interface SocketData {
    status: boolean;
    data: Product[];
}

@Injectable({
    providedIn: 'root'
})
export class ProductsService implements OnDestroy {
    private _products = new BehaviorSubject<Product[]>([]);
    public categories = new BehaviorSubject<ProductCategory[]>([]);
    public selectedCategoryId = -1;
    public products$ = this._products.asObservable();
    public availPages = new BehaviorSubject<number>(1);
    public currentPage = new BehaviorSubject<number>(1);

    constructor(private http: HttpClient, private constants: ConstantsService, private socketIO: SocketIoService,
                public toaster: ToastrService, private usersService: UsersService) {
        socketIO.init();
        this.requestProducts();
        this.requestCategories();
    }


    handleProductListUpdatedEvent(socketDataJson: string) {
        const socketData = JSON.parse(socketDataJson) as SocketData;
        socketData.status
            ? this._products.next(socketData.data)
            : this.toaster.error('couldn\'t update product list. try refreshing this page.');
    }

    filteredProductsBySearchStr(searchStr: string) {
        this.requestProducts(searchStr);
    }

    ngOnDestroy() {
        this.socketIO.removeListener(this.constants.shop.socketIO.productListUpdate, () => {
        });
    }

    public requestReviews(productId: number) {
        const httpParams: Params = {productId};
        return this.http.get<ProductReview[]>(this.constants.shop.http.products.review, {params: httpParams}).toPromise();
    }

    public getProducts(keyword?: string, page: number = 1, categoryId: number = -1, itemsPerPage: number = 10): Promise<any> {
        let urlParams: Params = {page, categoryId, itemsPerPage};

        if (keyword && keyword !== '') {
            urlParams = {page, categoryId, keyword, itemsPerPage};
        }

        return this.http.get<Product[]>(this.constants.shop.http.products.get, {params: urlParams}).toPromise().catch();
    }

    private requestProducts(keyword?: string, page?: string, categoryId?: number) {
        let urlParams: Params = {page: 1, categoryId: this.selectedCategoryId, itemsPerPage: 100};

        if (keyword && keyword !== '') {
            urlParams = {page: 1, categoryId: this.selectedCategoryId, keyword, itemsPerPage: 100};
        }

        this.http.get<any>(this.constants.shop.http.products.get, {params: urlParams}).toPromise().then(
            data => {
                this.availPages.next(data.pages);
                this._products.next(data.products);
            },
            () => {
                this.toaster.error('couldn\'t get products from server', 'something went wrong!');
            });
    }

    public async add(product: Product): Promise<any> {
        const formData: FormData = new FormData();
        formData.append('product', JSON.stringify(product));
        formData.append('file', product.image);
        // await this.http.post(this.constants.shop.http.products.uploadImage, formData).toPromise();
        return this.http.post(this.constants.shop.http.products.addOne, formData).toPromise().then(_ => {
            this.toaster.success('product added successfully!');
            this.requestProducts();
        });
    }

    public update(product: Product) {
        this.http.put(this.constants.shop.http.products.updateOne, product).toPromise()
            .then(_ => {
                    this.requestProducts();
                    this.toaster.success('product updated successfully!');
                },
                (failRes) => {
                    if (failRes.status === 405) {
                        this.toaster.error('You are not allowed to update products', 'Not an admin!');
                        return;
                    }
                    this.toaster.error(`updating product \'${product.name}\' failed`, 'Something went wrong!');
                }
            );
    }

    public remove(productId: number) {
        this.http.delete(this.constants.shop.http.products.delete, {params: new HttpParams().set('productId', productId.toString())})
            .toPromise()
            .then(
                () => {
                    this.requestProducts();
                },
                (failRes) => {
                    if (failRes.status === 405) {
                        this.toaster.error('You are not allowed to delete products', 'Not an admin!');
                        return;
                    }
                    this.toaster.error('somethine went wrong! try again ');
                }
            );
    }

    filterProductByCategory(category: string) {
        return [...this._products.value].filter(product => product.category.valueOf() === category);
    }

    private requestCategories() {
        this.http.get<ProductCategory[]>(this.constants.shop.http.products.getCategories).toPromise()
            .then((data) => {
                    this.categories.next(data);
                    this.toaster.success('fetched categories successfully');
                },
                (failRes) => {
                    this.toaster.error('failed to fetch categories successfully');
                }
            );
    }

    changeCategory(categoryId: number) {
        this.selectedCategoryId = categoryId;
        this.requestProducts();
    }

    uploadReview(review: ProductReview): Promise<any> {
        return this.http.post<any>(this.constants.shop.http.products.uploadReview, review).toPromise();
    }


}
