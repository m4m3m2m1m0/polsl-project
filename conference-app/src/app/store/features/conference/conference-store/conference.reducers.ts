import { createReducer, on } from '@ngrx/store';
import { ConferenceActions } from './conference-action-types';


export interface ConferenceState {
    currentConference: any;
    availableConferences: any[]
}

export const initialConferenceState: ConferenceState = {
    currentConference: null,
    availableConferences: []
};

export const conferenceReducer = createReducer(
    initialConferenceState,
    on(ConferenceActions.loadCurrentConfferenceForIdSuccess, (state, action) => {
        return {
            ...state,
            currentConference: action.conference
        }
    }),
    on(ConferenceActions.loadAvailableConferencesSuccess, (state, action) => {
        return {
            ...state,
            availableConferences: action.conferences
        }
    })
)