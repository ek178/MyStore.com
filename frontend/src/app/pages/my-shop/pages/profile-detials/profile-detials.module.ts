import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetialsComponent } from './profile-detials.component';
import {ProfileDetailsRoutingModule} from './profile-details-routing.module';

@NgModule({
  declarations: [ProfileDetialsComponent],
  imports: [
    CommonModule,
      ProfileDetailsRoutingModule
  ],
  exports: [
    ProfileDetialsComponent
  ]
})
export class ProfileDetialsModule { }
