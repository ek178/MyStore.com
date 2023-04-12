import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsEditPageComponent } from './products-edit-page.component';
import { VexRoutes } from '../../../../../@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
  {
    path: '',
    component: ProductsEditPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsEditRoutingModule {
}
