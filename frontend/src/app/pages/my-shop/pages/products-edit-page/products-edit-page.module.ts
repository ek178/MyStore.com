import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsEditPageComponent} from './products-edit-page.component';
import {ProductsEditRoutingModule} from './products-edit-routing.module';
import {ProductEditItemComponent} from "../../components/product-edit-item/product-edit-item.component";
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexModule} from '@angular/flex-layout';
import {ProductEditFormComponent} from "../../components/product-edit-form/product-edit-form.component";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MyShopModule} from "../my-shop/my-shop.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {IconModule} from "@visurel/iconify-angular";
import {MatIconModule} from "@angular/material/icon";
import {ProductAddFormComponent} from "../../components/product-add-form/product-add-form.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {SelectCategoryModule} from "../../components/select-category/select-category.module";

@NgModule({
    declarations: [
        ProductsEditPageComponent,
        ProductEditItemComponent,
        ProductEditFormComponent,
        ProductAddFormComponent
    ],
    imports: [
        CommonModule,
        ProductsEditRoutingModule,
        MatRadioModule,
        FormsModule,
        FlexModule,
        MatCardModule,
        MatTableModule,
        ScrollingModule,
        MyShopModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatSliderModule,
        MatSlideToggleModule,
        IconModule,
        MatIconModule,
        MatTooltipModule,
        SelectCategoryModule,
    ],
    exports: [ProductsEditPageComponent],
    providers: [ProductEditItemComponent, ProductEditFormComponent, ProductAddFormComponent]
})
export class ProductsEditPageModule {
}
