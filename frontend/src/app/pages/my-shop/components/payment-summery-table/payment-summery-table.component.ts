import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CartProductsDataSource} from "../../data-sources/cart-products-data-source";
import {OrderItem, ShoppingCartService} from "../../services/shopping-cart.service";
import {MatPaginator} from "@angular/material/paginator";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {fromEvent} from "rxjs";

@Component({
    selector: 'vex-payment-summery-table',
    templateUrl: './payment-summery-table.component.html',
    styleUrls: ['./payment-summery-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentSummeryTableComponent implements OnInit, AfterViewInit {
    @Input() title = 'My Shopping Summery';
    @Input() CartProducts: OrderItem[];

    dataSource: CartProductsDataSource;
    displayedColumns = ['name', 'amount', 'productTotal'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('input') input: ElementRef;

    constructor(public shoppingCartService: ShoppingCartService) {
    }

    ngOnInit(): void {
        this.dataSource = new CartProductsDataSource(this.shoppingCartService);
        this.dataSource.loadCartProducts().then();
    }

    ngAfterViewInit() {
        fromEvent(this.input.nativeElement, 'keyup').pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;
                this.loadCartProductsPage();
            })
        ).subscribe();

        this.paginator.page.pipe(
            tap(() => this.loadCartProductsPage())
        ).subscribe();
    }

    sumProductPrice(cartProduct: OrderItem): number {
        return cartProduct.amount * cartProduct.product.price;
    }

    loadCartProductsPage() {
        this.dataSource.loadCartProducts(this.input.nativeElement.value, this.paginator.pageIndex, this.paginator.pageSize).then();
    }

    onRowClicked(row) {
        console.log('Row Clicked: ' + row);
    }
}
