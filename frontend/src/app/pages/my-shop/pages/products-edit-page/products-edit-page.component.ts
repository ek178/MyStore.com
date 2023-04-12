import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Product, ProductsService} from '../../services/products.service';
import {BehaviorSubject} from "rxjs";
import icAdd from '@iconify/icons-ic/twotone-add';
import icEdit from '@iconify/icons-ic/mode-edit';


@Component({
    selector: 'vex-products-edit-page',
    templateUrl: './products-edit-page.component.html',
    styleUrls: ['./products-edit-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsEditPageComponent {
    products = new BehaviorSubject<Product[]>([]);
    chosenProduct = new BehaviorSubject<Product>(null);
    addingProductMode: boolean;

    icAdd = icAdd;
    icEdit = icEdit;
    constructor(public productsService: ProductsService) {
        this.productsService.products$.subscribe(data => {
            this.products.next(data);
            if (this.chosenProduct.value) {
                this.chosenProduct.next(this.products.value.find((product) => product.name === this.chosenProduct.value.name));
            }
        });

        this.addingProductMode = false;
        this.chosenProduct.subscribe(next => {
                if (next) {
                    this.addingProductMode = false;
                }
            }
        );
    }

    updateChosenProduct(next: Product) {
        this.chosenProduct.next(next);
    }

    isChecked(index: number): boolean {
        return index === 0;
    }

    trackByName(index, product) {
        return product.name;
    }

    searchProducts(searchStr: string) {
        debugger
        this.productsService.filteredProductsBySearchStr(searchStr);
    }

    createdNewProduct() {
        this.addingProductMode = false;
    }
}
