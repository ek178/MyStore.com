import {HttpClient} from '@angular/common/http';

export class GlobalConfiguration {
    ShopSocketIoPort: string;
}

export interface Shop {
    readonly socketIO: {
        productListUpdate: string
    };

    readonly http: {
        orders: {
            didBuyProduct: string
            get: string,
            addOne: string,
            getByUsername(username: string): string, // ????query param
        };
        products: {
            uploadReview: string;
            review: string;
            get: string,
            getCategories: string,
            addOne: string,
            delete: string,
            uploadImage: string
            updateOne: string
        };
        users: {
            editUser: string;
            updateCart: string,
            authenticate: string,
            getUser: string,
            register: string,
        };
        images: {
            getImage(baseUrl: string): string,
        }
    };
}

import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class ConstantsService {
    public urlRoot: string;
    public ShopSocketIOAddress: string;
    private socketIoPort: string;

    constructor(private http: HttpClient) {
        // For dev
        // this.urlRoot = `http://${window.location.hostname}`;

        // For Prod
         this.urlRoot = 'https://mystore-django-3-11-2.onrender.com';
    }

    public init() {
        this.http.get<GlobalConfiguration>('../../../../assets/globals.json').toPromise().then(
            data => {
            this.socketIoPort = data.ShopSocketIoPort;
            this.ShopSocketIOAddress = `ws://${window.location.hostname}:${this.socketIoPort}`;
        });
    }

    get shop(): Shop {
        const root = `${this.urlRoot}`;
        const productsRoot = `${root}/api/products`;
        const ordersRoot = `${root}/api/orders`;
        const usersRoot = `${root}/api/users`;
        return {
            socketIO: {
                productListUpdate: 'shop-product-list-updated'
            },
            http: {
                orders: {
                    didBuyProduct: `${ordersRoot}/didBuyProduct/`,
                    get: `${ordersRoot}/myorders/`,
                    addOne: `${ordersRoot}/makeorder/`,
                    getByUsername: (username) => `${ordersRoot}/${username}`,
                },
                products: {
                    review: `${productsRoot}/product/reviews/`,
                    uploadReview: `${productsRoot}/product/uploadReview/`,
                    uploadImage: `${productsRoot}/create/uploadPicture/`,
                    getCategories: `${productsRoot}/categories/`,
                    get: `${productsRoot}/`,
                    delete: `${productsRoot}/product/delete/`,
                    addOne: `${productsRoot}/create/`,
                    updateOne: `${productsRoot}/product/update/`
                },
                users: {
                    editUser: `${usersRoot}/updateUser/`,
                    updateCart: `${usersRoot}/update-cart/`,
                    authenticate: `${usersRoot}/login/`,
                    getUser: `${usersRoot}/profile/`,
                    register: `${usersRoot}/register/`,
                },
                images: {
                    getImage: (baseUrl) => `${root}${baseUrl}`
                }
            }
        };
    }

}
