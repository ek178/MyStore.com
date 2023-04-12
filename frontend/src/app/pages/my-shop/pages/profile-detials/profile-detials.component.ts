import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'vex-profile-detials',
    templateUrl: './profile-detials.component.html',
    styleUrls: ['./profile-detials.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileDetialsComponent {

    constructor() {
    }
}
