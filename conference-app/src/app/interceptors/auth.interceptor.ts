import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, flatMap, tap } from 'rxjs/operators';
import { UserFacade } from '../store/features/user/facades/user.facade';
import { UserState } from '../store/features/user/user-store/user.reducers';
import { selectUserToken } from '../store/features/user/user-store/user.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        protected _userFacade: UserFacade,
        protected _store: Store<UserState>
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this._store.select(selectUserToken).pipe(
            first(),
            flatMap(token => {
                // Set auth token to each request if available //
                if (token === null) token = localStorage.getItem('access_token');
                const request = (token !== null && token !== undefined ) ? req.clone({ setHeaders: { Authorization: 'Bearer ' + token } }) : req;

                return next.handle(request);
            }),
        )
    };

}
