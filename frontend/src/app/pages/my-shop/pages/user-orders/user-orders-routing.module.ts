import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserOrdersComponent } from './user-orders.component';
import { VexRoutes } from '../../../../../@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
  {
    path: '',
    component: UserOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserOrdersRoutingModule {
}
