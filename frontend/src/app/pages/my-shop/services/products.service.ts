import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConstantsService} from './constant.service';
import {SocketIoService} from './socket-io.service';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {UsersService} from './users.service';
import {ProductCategory} from '../../../models/Category';
import {Params} from "@angular/router";
import {CartProduct} from "./shopping-cart.service";
import {ProductReview} from "../../../models/ProductReview";

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

    private requestProducts(keyword?: string) {
        let urlParams: Params = {page: 1, categoryId: this.selectedCategoryId};

        if (keyword && keyword !== '') {
            urlParams = {page: 1, categoryId: this.selectedCategoryId, keyword};
        }

        this.http.get<Product[]>(this.constants.shop.http.products.get, {params: urlParams}).toPromise().then(
            data => {
                this._products.next(data);
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
        return this.http.post(this.constants.shop.http.products.addOne, formData).toPromise();
    }

    public update(product: Product) {
        this.http.put(this.constants.shop.http.products.updateOne, product, {
            headers: new HttpHeaders({
                Username: this.usersService.getConnectedUser().username,
                Password: this.usersService.getConnectedUser().password,
            })
        })
            .toPromise()
            .then(
                () => this.toaster.success('product updated successfully!'),
                (failRes) => {
                    if (failRes.status === 405) {
                        this.toaster.error('You are not allowed to update products', 'Not an admin!');
                        return;
                    }
                    this.toaster.error(`updating product \'${product.name}\' failed`, 'Something went wrong!');
                }
            );
    }

    public remove(productName: string) {
        this.http.delete(this.constants.shop.http.products.addOne, {
            headers: new HttpHeaders({
                ProductName: productName,
                Username: this.usersService.getConnectedUser().username,
                Password: this.usersService.getConnectedUser().password,
            })
        })
            .toPromise()
            .then(
                () => this.toaster.success('המוצר נמחק בהצלחה'),
                (failRes) => {
                    if (failRes.status === 405) {
                        this.toaster.error('You are not allowed to delete products', 'Not an admin!');
                        return;
                    }
                    this.toaster.error('המוצר לא הוסר, אנא נסה שנית', 'משהו השתבש!');
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
