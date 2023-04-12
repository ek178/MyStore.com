import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fadeInUp400ms} from '../../../../../@vex/animations/fade-in-up.animation';
import icDescription from '@iconify/icons-ic/twotone-description';
import icVisiblity from '@iconify/icons-ic/twotone-visibility';
import icDoneAll from '@iconify/icons-ic/twotone-done-all';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import {UsersService} from '../../../my-shop/services/users.service';

@Component({
    selector: 'vex-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        fadeInUp400ms
    ]
})
export class RegisterComponent implements OnInit {

    accountFormGroup: FormGroup;
    passwordFormGroup: FormGroup;

    passwordInputType = 'password';

    icDoneAll = icDoneAll;
    icDescription = icDescription;
    icVisibility = icVisiblity;
    icVisibilityOff = icVisibilityOff;
    icMoreVert = icMoreVert;

    constructor(private fb: FormBuilder,
                private cd: ChangeDetectorRef,
                private usersService: UsersService) {
    }

    @ViewChild('adminCheck') admin;

    ngOnInit() {
        /**
         * Horizontal Stepper
         * @type {FormGroup}
         */
        this.accountFormGroup = this.fb.group({
            firstname: [null, Validators.required],
            lastname: [null, Validators.required],
            email: [null, Validators.required],
            phone: [],
        });

        this.passwordFormGroup = this.fb.group({
            username: [null, Validators.required],
            password: [
                null,
                Validators.compose(
                    [
                        Validators.required,
                        Validators.minLength(6)
                    ]
                )
            ]
        });
    }

    showPassword() {
        this.passwordInputType = 'text';
        this.cd.markForCheck();
    }

    hidePassword() {
        this.passwordInputType = 'password';
        this.cd.markForCheck();
    }

    submit() {
        this.usersService.register({
            first_name: this.accountFormGroup.value.firstname,
            last_name: this.accountFormGroup.value.lastname,
            email: this.accountFormGroup.value.email,
            phone_number: this.accountFormGroup.value.phone,
            username: this.passwordFormGroup.value.username,
            password: this.passwordFormGroup.value.password,
            admin: this.admin.checked,
        });
    }
}
