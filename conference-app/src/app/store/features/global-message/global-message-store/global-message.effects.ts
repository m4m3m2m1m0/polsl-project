
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, map, tap } from 'rxjs/operators';
import { GlobalMessageActions } from './global-message-action-types';


@Injectable()
export class GlobalMessageEffects {

    constructor(
        private _matSnackBar: MatSnackBar,
        private _actions$: Actions
    ) { }

    showGlobalMessage$ = createEffect(() =>
        this._actions$
            .pipe(
                ofType(GlobalMessageActions.showGlobalMessage),
                map(action => action.message),
                tap(message => {
                    this._matSnackBar.open(message.message, message.action, message.config)
                }),
                delay(2000),
                map(() => this._matSnackBar.dismiss())
            ), { dispatch: false }
    )

    closeGlobalMessage$ = createEffect(() =>
        this._actions$
            .pipe(
                ofType(GlobalMessageActions.closeGlobalMessage),
                tap(() => this._matSnackBar.dismiss())
            )
    )

}
