import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Product, ProductsService} from "../../services/products.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import icEdit from '@iconify/icons-ic/mode-edit';
import icTrash from '@iconify/icons-ic/delete';
import {ConstantsService} from "../../services/constant.service";

@Component({
    selector: 'vex-product-edit-form',
    templateUrl: './product-edit-form.component.html',
    styleUrls: ['./product-edit-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductEditFormComponent implements OnInit, OnChanges {

    @Input() product: Product;

    formGroup: FormGroup;

    icEdit = icEdit;
    icTrash = icTrash;

    constructor(private fb: FormBuilder, private productsService: ProductsService, private constantsService: ConstantsService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.product) {
            this.resetForm();
        }
    }

    ngOnInit() {
        this.formGroup = this.fb.group({
            name: [{value: this.product.name, disabled: true}, Validators.required],
            description: [this.product.description],
            price: [this.product.price,
                Validators.compose(
                    [
                        Validators.required,
                        Validators.pattern('^[0-9]\\d*(\\.\\d{1,2})?$')
                    ]
                )],
            inStock: [this.product.inStock]
        });
    }

    resetForm() {
        this.formGroup = this.fb.group({
            name: [{value: this.product.name, disabled: true}, Validators.required],
            description: [this.product.description],
            price: [this.product.price,
                Validators.compose(
                    [
                        Validators.required,
                        Validators.pattern('^[0-9]\\d*(\\.\\d{1,2})?$')
                    ]
                )],
            inStock: [this.product.inStock]
        });
    }

    update() {
        this.productsService.update({
            _id: this.product._id,
            name: this.product.name,
            price: parseFloat(this.formGroup.value.price),
            description: this.formGroup.value.description,
            inStock: this.formGroup.value.inStock,
            image: this.product.image,
            category: this.product.category,
        });
    }

    remove() {
        this.productsService.remove(this.product._id);
        this.product = null;
    }

    getProductImgSrc(): string {
        return this.constantsService.shop.http.images.getImage(this.product.image);
    }
}
