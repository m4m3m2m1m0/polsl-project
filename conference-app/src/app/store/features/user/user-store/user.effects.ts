
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { UserActions } from './user-action-types';


@Injectable()
export class UserEffects {

    constructor(
        private _actions$: Actions
    ) { }

    loginUser$ = createEffect(() =>
        this._actions$
            .pipe(
                ofType(UserActions.loginUser),
                map(action => action.loginForm),
                tap(loginForm => {
                    // TODO: call to backend //
                })
            ), { dispatch: false }
    )

}
