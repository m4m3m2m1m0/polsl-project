import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConferenceActions } from '../conference-store/conference-action-types';
import { ConferenceState } from '../conference-store/conference.reducers';
import { selectAvailableConferences, selectCurrentConference } from '../conference-store/conference.selectors';

@Injectable({
    providedIn: 'root'
})
export class ConferenceFacade {

    constructor(
        protected _store: Store<ConferenceState>
    ) { }

    loadCurrentConferenceForId(id: any): void {
        this._store.dispatch(ConferenceActions.loadCurrentConfferenceForId({ id }));
    }

    loadAvailableConferences(startDate: any, endDate: any): void {
        return this._store.dispatch(ConferenceActions.loadAvailableConferences({ startDate, endDate }));
    }

    getAvailableConferences(): Observable<any> {
        return this._store.select(selectAvailableConferences);
    }

    getCurrentConference(): Observable<any> {
        return this._store.select(selectCurrentConference);
    }

}
