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
import {PageEvent} from "@angular/material/paginator";

@UntilDestroy()
@Component({
    selector: 'vex-my-shop',
    templateUrl: './my-shop.component.html',
    styleUrls: ['./my-shop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MyShopComponent {
    products = new BehaviorSubject<Product[]>([]);
    currentPage = 1;
    totalProducts = new BehaviorSubject<number>(1);
    searchTerm = '';
    currentCategory = -1;
    itemsPerPage = 10;

    constructor(private layoutService: LayoutService,
                private dialog: NgDialogAnimationService,
                private shoppingCartService: ShoppingCartService,
                public toaster: ToastrService,
                public productsService: ProductsService) {
        this.requestProducts();
    }

    private requestProducts() {
        this.productsService.getProducts(this.searchTerm, this.currentPage, this.currentCategory, this.itemsPerPage).then(
            data => {
                debugger
                this.totalProducts.next(data.totalProducts);
                this.products.next(data.products);
            },
            () => {
                this.toaster.error('couldn\'t get products from server', 'something went wrong! haha');
            });
    }

    itemsPerPageChanged(num: number) {
        this.itemsPerPage = num;
        this.requestProducts();
    }

    pageChanged(pageEvent: PageEvent) {
        this.currentPage = pageEvent.pageIndex;
        this.itemsPerPage = pageEvent.pageSize;
        this.requestProducts();
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
