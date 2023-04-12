import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UsersService} from '../pages/my-shop/services/users.service';
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let authReq = req;

        const token = localStorage.getItem('token');

        if (token) {
            const bearer = 'Bearer ' + JSON.parse(token);
            authReq = req.clone({headers: req.headers.set('Authorization', bearer)});
        }

        return next.handle(authReq);
    }
}
