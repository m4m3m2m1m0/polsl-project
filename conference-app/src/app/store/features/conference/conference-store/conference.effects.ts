
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { GlobalMessage } from 'src/app/models/global-message.model';
import { ConferenceService } from 'src/app/occ/services/conference/conference.service';
import { showGlobalMessage } from '../../global-message/global-message-store/global-message.actions';
import { ConferenceActions } from './conference-action-types';
import { getUserInterestedConferencesSuccess, loadAvailableConferencesSuccess, loadCurrentConfferenceForIdSuccess } from './conference.actions';


@Injectable()
export class ConferenceEffects {

    constructor(
        protected _actions$: Actions,
        protected _conferenceService: ConferenceService
    ) { }

    availableConferences$ = createEffect(() =>
        this._actions$
            .pipe(
                ofType(ConferenceActions.loadAvailableConferences),
                mergeMap(action => {
                    return this._conferenceService.getAvailableConferences(action.startDate, action.endDate).pipe(
                        switchMap(conferences => {
                            return [loadAvailableConferencesSuccess({ conferences })]
                        }),
                        catchError(error => {
                            const message: GlobalMessage = { message: 'Not found any conferences satisfying the conditions!', action: 'Close', config: null };
                            return of(showGlobalMessage({ message }));
                        })
                    )
                }),
            )
    )

    userInterestedConferences$ = createEffect(() =>
        this._actions$
            .pipe(
                ofType(ConferenceActions.getUserInterestedConferences),
                mergeMap(action =>
                    this._conferenceService.getUserInterestedConferences(action.userName).pipe(
                        switchMap(conferences => {
                            return [getUserInterestedConferencesSuccess({ conferences })]
                        })
                    )
                ),
            )
    )

    getConferenceForId$ = createEffect(() =>
        this._actions$
            .pipe(
                ofType(ConferenceActions.loadCurrentConfferenceForId),
                mergeMap(action =>
                    this._conferenceService.getConferenceForId(action.id).pipe(
                        switchMap(conference => {
                            return [loadCurrentConfferenceForIdSuccess({ conference })]
                        })
                    )
                ),
            )
    )
}
