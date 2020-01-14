
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { GlobalMessage } from 'src/app/models/global-message.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/occ/services/user/user.service';
import { showGlobalMessage } from '../../global-message/global-message-store/global-message.actions';
import { UserActions } from './user-action-types';
import { loginUser, loginUserSuccess } from './user.actions';


@Injectable()
export class UserEffects {

    constructor(
        protected _actions$: Actions,
        protected _userService: UserService
    ) { }

    loginUser$ = createEffect(() =>
        this._actions$
            .pipe(
                ofType(UserActions.loginUser),
                mergeMap(action =>
                    this._userService.loginUser(action.loginForm).pipe(
                        switchMap(res => {

                            let access_token = res.access_token;
                            let refresh_token = res.refresh_token;
                            let token_type = res.tokenType;

                            localStorage.setItem("access_token", access_token);
                            localStorage.setItem("refresh_token", refresh_token);
                            localStorage.setItem("token_type", token_type);

                            const data = `{"name": "${action.loginForm.userName}", "password": "${action.loginForm.password}", "_id": "${res.userId.$oid}" }`;
                            localStorage.setItem('user', btoa(data));

                            const user: User = {
                                userName: action.loginForm.userName,
                                _id: res.userId.$oid
                            }

                            return [loginUserSuccess({ user })]
                        }),
                        catchError(error => {
                            if (error.status == 401) {
                                const message: GlobalMessage = { message: 'Login or password not correct!', action: 'Close', config: null }
                                return of(showGlobalMessage({ message }));
                            } else {
                                const message: GlobalMessage = { message: 'Logged not successfully. Please contact support team!', action: 'Close', config: null };
                                return of(showGlobalMessage({ message }));
                            }
                        })
                    )
                ),
            )
    )

    registerUser$ = createEffect(() =>
        this._actions$
            .pipe(
                ofType(UserActions.registerUser),
                mergeMap(action =>
                    forkJoin(
                        of(action.registerForm),
                        this._userService.registerUser(action.registerForm)
                    )
                ),
                switchMap(([registerForm, user]) => {
                    const message: GlobalMessage = { message: 'User Registered successfully!', action: 'Close', config: null };
                    const loginForm = { userName: user.userName, password: registerForm.password }
                    return [
                        showGlobalMessage({ message }),
                        loginUser({ loginForm })
                    ]
                })
            )
    )


}
