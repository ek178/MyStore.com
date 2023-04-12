import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {VexModule} from '../@vex/vex.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CustomLayoutModule} from './custom-layout/custom-layout.module';
import {MyShopModule} from './pages/my-shop/pages/my-shop/my-shop.module';
import {SidenavModule} from '../@vex/layout/sidenav/sidenav.module';
import {IconModule} from '@visurel/iconify-angular';
import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from '@angular/flex-layout';
import {ToastrModule} from 'ngx-toastr';
import {CommonModule} from '@angular/common';
import {MatStepperModule} from "@angular/material/stepper";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {PaymentModule} from "./pages/my-shop/pages/payment/payment.module";
import {ConstantsService} from "./pages/my-shop/services/constant.service";
import {ProfileDetialsModule} from "./pages/my-shop/pages/profile-detials/profile-detials.module";
import {UserOrdersModule} from "./pages/my-shop/pages/user-orders/user-orders.module";
import {ProductsEditPageModule} from "./pages/my-shop/pages/products-edit-page/products-edit-page.module";
import { SelectCategoryComponent } from './pages/my-shop/components/select-category/select-category.component';
import { ProductInfoComponent } from './pages/my-shop/components/product-info/product-info.component';
import { ImageRoutingPipe } from './pipes/image-routing.pipe';
import {AuthInterceptor} from "./interceptor/AuthInterceptor";
import {MatInputModule} from "@angular/material/input";

@NgModule({
    declarations: [AppComponent, ProductInfoComponent, ImageRoutingPipe],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,

        // Vex
        VexModule,
        CustomLayoutModule,
        MyShopModule,
        PaymentModule,
        ProfileDetialsModule,
        UserOrdersModule,
        ProductsEditPageModule,
        SidenavModule,
        IconModule,
        MatButtonModule,
        FlexModule,
        CommonModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-left'
        }),
        MatStepperModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
    ],
    providers: [
        ConstantsService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
