import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from "../../services/products.service";
import accountIcon from '@iconify/icons-mdi/account';
import {ConstantsService} from "../../services/constant.service";
import {ProductReview} from "../../../../models/ProductReview";
import {MatDialog} from "@angular/material/dialog";
import {ProductInfoComponent} from "../product-info/product-info.component";
@Component({
    selector: 'vex-product',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent implements OnInit{

    @Input() product: Product;
    imageUrl: string;
    showDescription = new BehaviorSubject<boolean>(false);
    readonly accountIcon = accountIcon;
    reviews = new BehaviorSubject<ProductReview[]>([]);

    @Output() addToCart = new EventEmitter();

    constructor(private constantsService: ConstantsService, private dialog: MatDialog) {
    }

    ngOnInit() {
        this.imageUrl = this.constantsService.shop.http.images.getImage(this.product.image);
    }

    onMouseOver() {
        this.showDescription.next(true);
    }

    onMouseOut() {
        this.showDescription.next(false);
    }



    onAddToCart() {
        this.addToCart.emit(this.product);
    }

    openInfoDialog() {
        this.dialog.open(ProductInfoComponent, {data: this.product, width: '800px', maxHeight:'1000px'});
    }
}
