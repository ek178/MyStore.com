import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UsersService} from '../services/users.service';
import {Location} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class OnlyAdminsGuard implements CanActivate {
    constructor(private usersService: UsersService, private location: Location, private router: Router) {
    }

    canActivate(): boolean {
        if (this.usersService.isAdmin()) {
            this.location.replaceState('');
            return true;
        }
        window.alert('you are not allowed here');
        this.location.replaceState('/');
        this.router.navigateByUrl('/').then();
        return false;
    }

}
