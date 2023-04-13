import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {ProductCategory} from "../../../../models/Category";

@Component({
  selector: 'vex-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.scss']
})
export class SelectCategoryComponent {
  @Output() changedCategory = new EventEmitter<ProductCategory>();
  defaultCategory: ProductCategory = { _id: -1, name: 'all'};
  constructor(public productsService: ProductsService) {
  }

  changeCategory(category: ProductCategory) {
    this.changedCategory.emit(category);
  }

}
