import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CartProduct, ShoppingCartService} from '../../services/shopping-cart.service';
import icTrash from '@iconify/icons-ic/delete';
import {ConstantsService} from "../../services/constant.service";


@Component({
    selector: 'vex-cart-product',
    templateUrl: './cart-product-item.component.html',
    styleUrls: ['./cart-product-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartProductItemComponent {
    constructor(private shoppingCartService: ShoppingCartService, public constantsService: ConstantsService) {
    }

    icTrash = icTrash;

    @Input()
    cartProduct: CartProduct;

    setNewAmount(newAmount: number) {
        this.shoppingCartService.setProductAmount(this.cartProduct.product.name, newAmount);
    }
}
