import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import icDescription from '@iconify/icons-ic/twotone-description';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {stagger80ms} from '../../../../../@vex/animations/stagger.animation';
import {fadeInUp400ms} from '../../../../../@vex/animations/fade-in-up.animation';
import {scaleIn400ms} from '../../../../../@vex/animations/scale-in.animation';
import {fadeInRight400ms} from '../../../../../@vex/animations/fade-in-right.animation';
import icVisiblity from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import icDoneAll from '@iconify/icons-ic/twotone-done-all';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import {OrdersService} from '../../services/orders.service';

@Component({
    selector: 'vex-payment-form',
    templateUrl: './payment-form.component.html',
    styleUrls: ['./payment-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        stagger80ms,
        fadeInUp400ms,
        scaleIn400ms,
        fadeInRight400ms
    ]
})
export class PaymentFormComponent implements OnInit {

    addressFormGroup: FormGroup;
    confirmFormGroup: FormGroup;

    icDoneAll = icDoneAll;
    icDescription = icDescription;
    icVisibility = icVisiblity;
    icVisibilityOff = icVisibilityOff;
    icMoreVert = icMoreVert;

    constructor(private fb: FormBuilder,
                private ordersService: OrdersService) {
    }

    ngOnInit() {
        /**
         * Horizontal Stepper
         * @type {FormGroup}
         */
        this.addressFormGroup = this.fb.group({
            country: [null, Validators.required],
            city: [null, Validators.required],
            street: [null, Validators.required],
            postalCode: [null,
                Validators.compose(
                    [
                        Validators.required,
                        Validators.pattern('^[0-9]*$')
                    ]
                )],
        });

        this.confirmFormGroup = this.fb.group({
            terms: [null, Validators.requiredTrue]
        });
    }

    submit() {
        this.ordersService.completeOrder({
            country: this.addressFormGroup.value.country,
            city: this.addressFormGroup.value.city,
            address: this.addressFormGroup.value.street,
            postalCode: parseInt(this.addressFormGroup.value.postalCode, 10),
        });
    }
}
