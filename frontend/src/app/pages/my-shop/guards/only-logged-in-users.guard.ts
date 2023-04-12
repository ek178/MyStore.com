import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UsersService} from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyLoggedInUsersGuard implements CanActivate {
    constructor(private usersService: UsersService, private location: Location, private router: Router) {
    }

    canActivate(): boolean {
        if (this.usersService.isLoggedIn()) {
            this.location.replaceState('');
            return true;
        }

        this.location.replaceState('/');
        this.router.navigateByUrl('/login').then();
        return false;
    }
}
