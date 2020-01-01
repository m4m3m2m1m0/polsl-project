import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConferenceState } from './conference.reducers';


export const selectConferenceState = createFeatureSelector<ConferenceState>("conference");

export const selectCurrentConference = createSelector(
    selectConferenceState,
    state => state.currentConference
);

export const selectAvailableConferences = createSelector(
    selectConferenceState, 
    state => state.availableConferences
);

export const selectUserInterestedConferences = createSelector(
    selectConferenceState, 
    state => state.userInterestedConferences
);
