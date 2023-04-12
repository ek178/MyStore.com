import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConstantsService} from './constant.service';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject, Subject, using} from 'rxjs';
import {CartProduct, ShoppingCartService} from './shopping-cart.service';
import * as shajs from 'sha.js';

export interface User {
    username: string;
    password: string;
    email: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    admin: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private _connectedUser = new BehaviorSubject<User>(null);
    public connectedUser$ = this._connectedUser.asObservable();
    public userToken = new Subject<string>();

    constructor(
        private http: HttpClient,
        private constants: ConstantsService,
        private localStorageService: LocalStorageService,
        private router: Router,
        private toaster: ToastrService,
        private shoppingCartService: ShoppingCartService
    ) {
        constants.init();

        this.initUserToken();
    }

    private initUserToken() {
        const existingToken = this.getStorageToken();

        if (existingToken) {
            this.userToken.next(existingToken);
            this.getProfile();
        }
    }

    private updateUserToken(token: string) {
        this.localStorageService.setItem('token', token);
        this.userToken.next(token);
    }


    isLoggedIn = () => !this.isEmpty(this._connectedUser.value);

    private isEmpty(itemToCheck: any): boolean {
        return itemToCheck === undefined || itemToCheck === null;
    }

    isAdmin(): boolean {
        if (this._connectedUser.value == null) {
            this.logout();
            return false;
        }

        return this._connectedUser.value.admin;
    }

    getConnectedUser(): User {
        return this._connectedUser.value;
    }

    logout() {
        this._connectedUser.next(null);
        this.router.navigateByUrl('/login').then();
        this.localStorageService.clear();
        // this._connectedUser.value.shoppingCart = this.shoppingCartService.getShoppingCart();
        // this.updateShoppingCartInDB(this._connectedUser.value).then(
        //     () => {
        //         this.localStorageService.clear();
        //         this._connectedUser.next(null);
        //         this.router.navigateByUrl('/login').then();
        //     },
        //     () => {
        //         this.toaster.error('something went wrong, couldn\'t save the changes you\'ve to your shopping cart in system');
        //     }
        // );
    }

    auth(username: string, password: string) {
        this.http.post<string>(this.constants.shop.http.users.authenticate, {
            username,
            password
        }).toPromise().then(token => {
                this.updateUserToken(token);
            }
        );
    }


    private getProfile() {
        this.http.get<User>(this.constants.shop.http.users.getUser).toPromise().then(
            (data) => {
                this._connectedUser.next(data);
                this.router.navigateByUrl('/').then();
            },
            (failRes) => {
                const status = failRes.status;
                if (status === 401) {
                    window.alert('username and/or password are incorrect. please try again.');
                    return;
                }

                this.toaster.error('couldn\'t reach server server. can not login, try again later', 'something went wrong!');
            }
        );
    }

    private updateShoppingCartInDB(updatedUser: User): Promise<User> {
        return this.http.put<User>(this.constants.shop.http.users.updateCart, updatedUser).toPromise();
    }

    private getStorageToken(): string {
        return this.localStorageService.getItem('token');
    }

    register(user: User) {
        //TODO: fix hash
        //user.password = this.stringToHash(user.password);
        this.http.post<User>(this.constants.shop.http.users.register, user)
            .toPromise()
            .then(
                async () => {
                    this.toaster.success('new account created successfully', 'Congrats!');
                    await this.router.navigateByUrl('/login');
                },
                (failRes) => {
                    if (failRes.status === 406) {
                        this.toaster.error('נדמה שאתה ליאור פלצין :((( קח את הקרשים שלך אתה לא עושה איתנו לג בעומר', 'אופס!');
                        return;
                    }

                    this.toaster.error('creating account failed. please try again', 'Something went wrong!');
                }
            );
    }

    private stringToHash(string: string) {
        return shajs('sha256').update({string}).digest('hex');
    }
}
