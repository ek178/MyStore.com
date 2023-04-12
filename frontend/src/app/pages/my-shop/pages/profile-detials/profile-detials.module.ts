import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetialsComponent } from './profile-detials.component';
import {ProfileDetailsRoutingModule} from './profile-details-routing.module';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FlexModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [ProfileDetialsComponent],
    imports: [
        CommonModule,
        ProfileDetailsRoutingModule,
        MatFormFieldModule,
        FlexModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule
    ],
  exports: [
    ProfileDetialsComponent
  ]
})
export class ProfileDetialsModule { }
