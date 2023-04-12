import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";

@Component({
    selector: 'vex-profile-detials',
    templateUrl: './profile-detials.component.html',
    styleUrls: ['./profile-detials.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileDetialsComponent implements OnInit {
    accountFormGroup: FormGroup;

    constructor(private fb: FormBuilder, private usersService: UsersService) {

    }

    ngOnInit() {
        this.accountFormGroup = this.fb.group({
            firstname: [this.usersService.getUser().first_name, Validators.required],
            lastname: [this.usersService.getUser().last_name, Validators.required],
            email: [this.usersService.getUser().email, Validators.required],
        });
    }

    editProfile() {
        const firstname = this.accountFormGroup.get('firstname').value;
        const lastname = this.accountFormGroup.get('lastname').value;
        const email = this.accountFormGroup.get('email').value;
        this.usersService.editUser(firstname, lastname, email);
    }

}
