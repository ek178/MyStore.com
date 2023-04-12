import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Product} from '../../services/products.service';
import {ConstantsService} from "../../services/constant.service";

@Component({
  selector: 'vex-product-edit-item',
  templateUrl: './product-edit-item.component.html',
  styleUrls: ['./product-edit-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductEditItemComponent {
  @Input() product: Product;

  constructor(private constantsService: ConstantsService) { }

  getProductImgSrc(): string {
    return this.constantsService.shop.http.images.getImage(this.product.image);
  }
}
