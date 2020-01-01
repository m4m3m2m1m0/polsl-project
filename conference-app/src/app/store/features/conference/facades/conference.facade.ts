import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Conference } from 'src/app/models/conference.model';
import { ConferenceActions } from '../conference-store/conference-action-types';
import { ConferenceState } from '../conference-store/conference.reducers';
import { selectAvailableConferences, selectCurrentConference, selectUserInterestedConferences } from '../conference-store/conference.selectors';

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

    loadAvailableConferences(startDate: any, endDate?: any): void {
        return this._store.dispatch(ConferenceActions.loadAvailableConferences({ startDate, endDate }));
    }

    getAvailableConferences(): Observable<Conference[]> {
        return this._store.select(selectAvailableConferences);
    }

    getCurrentConference(): Observable<Conference> {
        return this._store.select(selectCurrentConference);
    }

    loadUserInterestedConferences(userName: any): void {
        this._store.dispatch(ConferenceActions.getUserInterestedConferences(userName));
    }

    getUserInterestedConferences(): Observable<Conference[]> {
        return this._store.select(selectUserInterestedConferences);
    }

}
