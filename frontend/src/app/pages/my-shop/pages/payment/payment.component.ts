import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart.service';

@Component({
    selector: 'vex-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentComponent {
    constructor(public shoppingCartService: ShoppingCartService) {}
}
