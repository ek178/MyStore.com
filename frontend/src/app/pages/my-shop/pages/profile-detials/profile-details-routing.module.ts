import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileDetialsComponent } from './profile-detials.component';
import { VexRoutes } from '../../../../../@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
  {
    path: '',
    component: ProfileDetialsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileDetailsRoutingModule {
}
