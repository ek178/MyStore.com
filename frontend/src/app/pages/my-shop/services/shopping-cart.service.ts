import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LocalStorageService} from "./local-storage.service";
import {Product} from "./products.service";

export interface CartProduct {
    product: Product;
    amount: number;
}

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {
    private _cartProducts = new BehaviorSubject<CartProduct[]>([]);
    cartProducts$ = this._cartProducts.asObservable();
    paymentSum: Observable<number>;
    totalProductsAmount: Observable<number>;

    constructor(private localStorageService: LocalStorageService) {
        this._cartProducts.next([]);
        this.paymentSum = this._cartProducts.pipe(
            map((products) =>
                products.reduce((sum, curr) => sum + (curr.product.price * curr.amount), 0)
            )
        );
        this.totalProductsAmount = this._cartProducts.pipe(
            map((products) =>
                products.reduce((sum, curr) => sum + curr.amount, 0)
            )
        );
    }

    countCartProducts() {
        return this._cartProducts.value.length;
    }

    clear() {
        this.saveShoppingCartInStorage([]);
    }

    addToCart(product: Product) {
        return this.saveShoppingCartInStorage(
            this.isEmpty(this.findProductInCart(product.name)) ?
                this.addNewCartProduct(product) :
                this.increaseAmount(product.name));
    }

    setProductAmount(cartProductName: string, newAmount: number) {
        const foundProduct = this.findProductInCart(cartProductName);
        this.saveShoppingCartInStorage(
            this.isEmpty(foundProduct) || newAmount <= 0
                ? this.deleteProductFromCart(cartProductName)
                : this.setAmount(cartProductName, newAmount)
        );
    }

    isCartEmpty(): boolean {
        return this._cartProducts.value.length <= 0;
    }

    private getCartProducts() {
        this.initCartProducts();
        return this.localStorageService.getItem('cartProducts');
    }

    private findProductInCart(productName: string): CartProduct {
        return this._cartProducts.value.find(cartProduct => cartProduct.product.name === productName);
    }

    private increaseAmount(cartProductName: string) {
        return this._cartProducts.value.map(cartProduct => {
            if (cartProduct.product.name === cartProductName) {
                cartProduct.amount += 1;
            }
            return cartProduct;
        });
    }

    private addNewCartProduct(product: Product) {
        const updatedCart: CartProduct[] = [...this._cartProducts.value];
        updatedCart.push({product, amount: 1});
        return updatedCart;
    }

    private setAmount(cartProductName: string, newAmount: number): CartProduct[] {
        return this._cartProducts.value.map(cartProduct => {
            if (cartProduct.product.name === cartProductName) {
                cartProduct.amount = newAmount;
            }
            return cartProduct;
        });
    }

    private deleteProductFromCart(productName: string): CartProduct[] {
        const updatedCart = [...this._cartProducts.value];
        const index = updatedCart.findIndex(cartProduct => cartProduct.product.name === productName);
        updatedCart.splice(index, 1);
        return updatedCart;
    }

    private initCartProducts() {
        if (this.localStorageService.getItem('cartProducts') == null) {
            this.saveShoppingCartInStorage([]);
        }
    }

    saveShoppingCartInStorage(cart: CartProduct[]) {
        this._cartProducts.next(cart);
        this.localStorageService.setItem('cartProducts', cart);
    }

    getShoppingCart(): CartProduct[] {
        return this._cartProducts.value;
    }

    private isEmpty(itemToCheck: any): boolean {
        return itemToCheck === undefined || itemToCheck === null;
    }
}
