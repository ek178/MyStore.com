import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UsersService} from "../services/users.service";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class OnlyNotLoggedInUsersGuard implements CanActivate {
  constructor(private usersService: UsersService, private location: Location, private router: Router) {
  }

  canActivate(): boolean {
    if (this.usersService.isLoggedIn()) {
      window.alert('you are already logged in');
      this.location.replaceState('/');
      this.router.navigateByUrl('/').then();
      return false;
    }

    this.location.replaceState('/');
    return true;
  }
}
