import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SelectCategoryComponent} from './select-category.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [SelectCategoryComponent],
  exports: [
    SelectCategoryComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
  ]
})
export class SelectCategoryModule {
}
