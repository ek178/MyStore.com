import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserOrdersComponent} from './user-orders.component';
import {UserOrdersRoutingModule} from './user-orders-routing.module';
import {WidgetTableModule} from "../../../../../@vex/components/widgets/widget-table/widget-table.module";
import {TableColumn} from "../../../../../@vex/interfaces/table-column.interface";
import {Order} from "../../services/orders.service";
import {CartProduct} from "../../services/shopping-cart.service";
import {MatTableModule} from "@angular/material/table";

@NgModule({
    declarations: [UserOrdersComponent],
    imports: [
        CommonModule,
        UserOrdersRoutingModule,
        WidgetTableModule,
        MatTableModule
    ],
    exports: [
        UserOrdersComponent
    ]
})
export class UserOrdersModule {
    constructor() {
    }
}
