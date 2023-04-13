import {Injectable} from '@angular/core';
import {OrderItem, ShoppingCartService} from './shopping-cart.service';
import {User, UsersService} from './users.service';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {Params, Router} from "@angular/router";
import {ConstantsService} from "./constant.service";

export interface Order {
    orderItems: OrderItem[];
    shippingAddress: ShippingAddress;
    user: User;
    totalPrice: number;
    createdAt?: string;
    _id?: number;
}

export interface ShippingAddress {
    country: string;
    city: string;
    address: string;
    postalCode: number;
}

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    constructor(
        private toaster: ToastrService,
        private http: HttpClient,
        private router: Router,
        private shoppingCartService: ShoppingCartService,
        private usersService: UsersService,
        private constants: ConstantsService
    ) {
        constants.init();
    }

    getAllOrders(): Promise<Order[]> {
        return this.http.get<Order[]>(this.constants.shop.http.orders.get).toPromise();
    }

    didBuyProduct(productName: string): Promise<boolean> {
        const params: Params = {productName};
        return this.http.get<boolean>(this.constants.shop.http.orders.didBuyProduct, {params}).toPromise();
    }


    completeOrder(orderAddress: ShippingAddress) {
        const orderItems = this.shoppingCartService.getShoppingCart();
        let totalPrice = 0;
        orderItems.forEach(i => totalPrice += (i.product.price * i.amount));

        const order: Order = {
            orderItems: this.shoppingCartService.getShoppingCart(),
            shippingAddress: orderAddress,
            user: this.usersService.getConnectedUser(),
            totalPrice
        };

        this.http.post<Order>(this.constants.shop.http.orders.addOne, order)
            .toPromise()
            .then(
                async () => {
                    this.shoppingCartService.clear();
                    this.toaster.success('הזמנה הושלמה בהצלחה', 'איזה כיף!');
                    await this.router.navigateByUrl('/');
                },
                () => {
                    this.toaster.error('משהו השתבש! לא הצלחנו להכניס את הזמנתך למערכת, אנא נסה שנית');
                }
            );
    }
}
