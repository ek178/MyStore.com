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
import {BehaviorSubject, forkJoin} from "rxjs";

@UntilDestroy()
@Component({
    selector: 'vex-my-shop',
    templateUrl: './my-shop.component.html',
    styleUrls: ['./my-shop.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})

export class MyShopComponent {
    products = new BehaviorSubject<Product[]>([]);
    currentPage = 1;
    totalPages = 1;
    searchTerm = '';
    currentCategory = -1;

    constructor(private layoutService: LayoutService,
                private dialog: NgDialogAnimationService,
                private shoppingCartService: ShoppingCartService,
                public toaster: ToastrService,
                public productsService: ProductsService) {
        this.requestProducts();
    }

    private requestProducts() {
        this.productsService.getProducts(this.searchTerm, this.currentPage, this.currentCategory).then(
            data => {
                this.totalPages = data.pages;
                this.products.next(data.products);
            },
            () => {
                this.toaster.error('couldn\'t get products from server', 'something went wrong!');
            });
    }

    changeCategory(category: number) {
        this.currentCategory = category;
        this.requestProducts();
    }

    searchProducts(searchStr: string) {
        this.searchTerm = searchStr;
        this.requestProducts();
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
