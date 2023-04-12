import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ShoppingCartService} from '../services/shopping-cart.service';

@Injectable({
    providedIn: 'root'
})
export class NotEmptyCartGuard implements CanActivate {
    constructor(private shoppingCartService: ShoppingCartService, private location: Location, private router: Router) {
    }

    canActivate(): boolean {
        if (this.shoppingCartService.isCartEmpty()) {
            this.location.replaceState('/');
            this.router.navigateByUrl('/').then();
            return false;
        }

        return true;
    }
}
