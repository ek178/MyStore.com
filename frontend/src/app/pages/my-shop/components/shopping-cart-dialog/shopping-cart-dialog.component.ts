import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'vex-shopping-cart',
    templateUrl: './shopping-cart-dialog.component.html',
    styleUrls: ['./shopping-cart-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartDialogComponent {
    constructor(public shoppingCartService: ShoppingCartService,
                public dialogRef: MatDialogRef<ShoppingCartDialogComponent>) {
    }

    onGoToPayment() {
        this.dialogRef.close();
    }
}
