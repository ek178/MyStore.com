import {Component, Inject, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product, ProductsService} from "../../services/products.service";
import {BehaviorSubject} from "rxjs";
import {ProductReview} from "../../../../models/ProductReview";
import accountIcon from '@iconify/icons-mdi/account';
import {ConstantsService} from "../../services/constant.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrdersService} from "../../services/orders.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'vex-product-info',
    templateUrl: './product-info.component.html',
    styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
    product: Product;
    reviews = new BehaviorSubject<ProductReview[]>([]);
    canReview = new BehaviorSubject<boolean>(false);
    accountIcon = accountIcon;
    formGroup: FormGroup;

    constructor(private http: HttpClient, private productService: ProductsService, public constantsService: ConstantsService, @Inject(MAT_DIALOG_DATA) public defaults: any,
                private orderService: OrdersService, private fb: FormBuilder,  public dialogRef: MatDialogRef<ProductInfoComponent>) {

    }

    ngOnInit(): void {
        this.product = this.defaults;
        this.productService.requestReviews(this.product._id).then(reviews => this.reviews.next(reviews));
        this.orderService.didBuyProduct(this.product.name).then(canReview => this.canReview.next(canReview));

        this.formGroup = this.fb.group({
            score: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
            review: ['', Validators.required],
        });
    }

    submitReview() {
        if (this.formGroup.valid) {
            const review: ProductReview = {
                product: this.product.name,
                comment: this.formGroup.get('review').value,
                rating: this.formGroup.get('score').value
            };

            this.productService.uploadReview(review).then( _ => this.dialogRef.close());
        }
    }

}
