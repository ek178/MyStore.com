import {ChangeDetectionStrategy, Component} from '@angular/core';
import {UntilDestroy} from '@ngneat/until-destroy';
import {LayoutService} from '../../../../../@vex/services/layout.service';
import {ShoppingCartDialogComponent} from '../../components/shopping-cart-dialog/shopping-cart-dialog.component';
import {NgDialogAnimationService} from 'ng-dialog-animation';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {ToastrService} from 'ngx-toastr';
import {toTitleCase} from 'codelyzer/util/utils';
import {Product, ProductsService} from '../../services/products.service';
import {ProductCategory} from "../../../../models/Category";

@UntilDestroy()
@Component({
    selector: 'vex-my-shop',
    templateUrl: './my-shop.component.html',
    styleUrls: ['./my-shop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MyShopComponent {


    constructor(private layoutService: LayoutService,
                private dialog: NgDialogAnimationService,
                private shoppingCartService: ShoppingCartService,
                public toaster: ToastrService,
                public productsService: ProductsService) {
    }

    changeCategory(category: number) {
        debugger
        this.productsService.changeCategory(category);
    }

    searchProducts(searchStr: string) {
        this.productsService.filteredProductsBySearchStr(searchStr);
    }

    openShoppingCartDialog() {
        this.dialog.open(ShoppingCartDialogComponent, {
            panelClass: 'custom-dialog-container',
            width: '30rem',
            height: '100%',
            position: {rowStart: '0'},
            animation: {to: 'right'},
        });
    }

    addToCart(product: Product) {
        this.shoppingCartService.addToCart(product);
        this.toaster.success(`Added to shopping cart : 1 ${toTitleCase(product.name)}`, 'Success!');
    }
}
