import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart.service';

@Component({
    selector: 'vex-payment-summery-receipt',
    templateUrl: './payment-summery-receipt.component.html',
    styleUrls: ['./payment-summery-receipt.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentSummeryReceiptComponent {

    constructor(public shoppingCartService: ShoppingCartService) {
    }

}
