import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyShopComponent } from './my-shop.component';

const routes: Routes = [
    {
        path: '',
        component: MyShopComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MyShopRoutingModule {
}
