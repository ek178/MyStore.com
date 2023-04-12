import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Order, OrdersService} from "../../services/orders.service";
import {TableColumn} from "../../../../../@vex/interfaces/table-column.interface";
import {CartProduct} from "../../services/shopping-cart.service";

@Component({
    selector: 'vex-user-orders',
    templateUrl: './user-orders.component.html',
    styleUrls: ['./user-orders.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserOrdersComponent implements OnInit {
    orders = new BehaviorSubject<Order[]>([]);
    tableColumns: TableColumn<CartProduct>[] = [
        {
            label: 'Name',
            property: 'product',
            type: 'text',
            pluck: (a) => a.product.name,
            cssClasses: ['text-center']
        },
        {
            label: 'Amount',
            property: 'amount',
            type: 'text',
            pluck: (a) => a.amount.toString(),
            cssClasses: ['text-center']
        },
    ];

    constructor(private orderService: OrdersService) {
    }

    getTotalItemPrice(p: CartProduct) {
        return p.product.price * p.amount;
    }

    ngOnInit() {
        this.orderService.getAllOrders().then(orders => {
                this.orders.next(orders)
            }
        );
    }


}
