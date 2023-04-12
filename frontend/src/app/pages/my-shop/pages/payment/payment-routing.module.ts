import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaymentComponent } from './payment.component';
import { VexRoutes } from '../../../../../@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
  {
    path: '',
    component: PaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule {
}
