import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import icShoppingCart from '@iconify/icons-ic/shopping-cart';
import {ShoppingCartService} from '../../services/shopping-cart.service';

@Component({
    selector: 'vex-shopping-cart-button',
    templateUrl: './shopping-cart-button.component.html',
    styleUrls: ['./shopping-cart-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartButtonComponent {
    icShoppingCart = icShoppingCart;

    @Output() openShoppingCart = new EventEmitter();

    constructor(public shoppingCartService: ShoppingCartService) {
    }

    openShoppingCartDialog() {
        this.openShoppingCart.emit();
    }
}
