import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import {fadeInUp400ms} from '../../../../../@vex/animations/fade-in-up.animation';
import {UsersService} from "../../../my-shop/services/users.service";

@Component({
    selector: 'vex-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        fadeInUp400ms
    ]
})
export class LoginComponent implements OnInit {
    form: FormGroup;

    inputType = 'password';
    visible = false;

    icVisibility = icVisibility;
    icVisibilityOff = icVisibilityOff;

    constructor(private router: Router,
                private fb: FormBuilder,
                private cd: ChangeDetectorRef,
                private usersService: UsersService
    ) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    submit() {
        // TODO: check if need to reset
        this.usersService.auth(this.form.value.username, this.form.value.password);
    }

    toggleVisibility() {
        if (this.visible) {
            this.inputType = 'password';
            this.visible = false;
            this.cd.markForCheck();
        } else {
            this.inputType = 'text';
            this.visible = true;
            this.cd.markForCheck();
        }
    }
}
