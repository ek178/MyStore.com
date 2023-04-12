import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyShopComponent} from './my-shop.component';
import {ToolbarModule} from '../../../../../@vex/layout/toolbar/toolbar.module';
import {MyShopRoutingModule} from './my-shop-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {IconModule} from '@visurel/iconify-angular';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ShoppingCartButtonComponent} from '../../components/shopping-cart-button/shopping-cart-button.component';
import {ShoppingCartDialogComponent} from '../../components/shopping-cart-dialog/shopping-cart-dialog.component';
import {ProductSearchComponent} from "../../components/product-search/product-search.component";
import {ProductItemComponent} from '../../components/product-item/product-item.component';
import {NoResultsComponent} from "../../components/no-results/no-results.component";
import {MatDividerModule} from "@angular/material/divider";
import {CartProductItemComponent} from "../../components/cart-product-item/cart-product-item.component";
import {MatDialogModule} from "@angular/material/dialog";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatSelectModule} from "@angular/material/select";
import {SelectCategoryModule} from "../../components/select-category/select-category.module";

@NgModule({
    declarations: [MyShopComponent, ShoppingCartButtonComponent, ShoppingCartDialogComponent, ProductSearchComponent, ProductItemComponent, NoResultsComponent, CartProductItemComponent],
    imports: [
        CommonModule,
        ToolbarModule,
        MyShopRoutingModule,
        MatIconModule,
        IconModule,
        MatTooltipModule,
        MatSidenavModule,
        MatDividerModule,
        MatDialogModule,
        ScrollingModule,
        MatButtonModule,
        FlexLayoutModule,
        MatSelectModule,
        SelectCategoryModule,
    ],
    exports: [
        ProductSearchComponent,
        NoResultsComponent
    ],
    providers: [ShoppingCartButtonComponent, ShoppingCartDialogComponent, ProductSearchComponent, ProductItemComponent, NoResultsComponent, CartProductItemComponent]
})
export class MyShopModule {
}
