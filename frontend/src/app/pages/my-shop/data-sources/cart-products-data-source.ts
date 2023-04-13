import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {OrderItem, ShoppingCartService} from '../services/shopping-cart.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {delay} from "rxjs/operators";

export class CartProductsDataSource implements DataSource<OrderItem> {
    private cartProductsSubject = new BehaviorSubject<OrderItem[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private shoppingCartService: ShoppingCartService) {
    }

    connect(collectionViewer: CollectionViewer): Observable<OrderItem[] | ReadonlyArray<OrderItem>> {
        return this.cartProductsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.cartProductsSubject.complete();
        this.loadingSubject.complete();
    }

    async loadCartProducts(filter = '', pageIndex = 0, pageSize = 3) {
        this.loadingSubject.next(true);
        this.cartProductsSubject.next([]);

        await new Promise(f => setTimeout(f, 700));
        const curCart = this.shoppingCartService.getShoppingCart();
        const filteredCart = curCart.filter(prod => prod.product.name.toLowerCase().includes(filter.toLowerCase())).slice(pageIndex * pageSize, pageSize * (pageIndex + 1));
        this.loadingSubject.next(false);

        this.cartProductsSubject.next(filteredCart);
    }
}
