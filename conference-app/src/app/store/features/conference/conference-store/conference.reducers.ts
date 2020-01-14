import { createReducer, on } from '@ngrx/store';
import { ConferenceActions } from './conference-action-types';


export interface ConferenceState {
    currentConference: any;
    availableConferences: any[];
    userInterestedConferences: any[];
    userConferences: any[];
}

export const initialConferenceState: ConferenceState = {
    currentConference: null,
    availableConferences: [],
    userInterestedConferences: [],
    userConferences: []
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
    }),
    on(ConferenceActions.getUserInterestedConferencesSuccess, (state, action) => {
        return {
            ...state,
            userInterestedConferences: action.conferences
        }
    }),
    on(ConferenceActions.loadUserConferencesSuccess, (state, action) => {
        return {
            ...state,
            userConferences: action.conferences
        }
    })
)