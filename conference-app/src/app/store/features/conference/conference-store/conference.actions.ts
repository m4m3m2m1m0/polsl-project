import { createAction, props } from '@ngrx/store';

export const loadCurrentConfferenceForId = createAction(
    "[Conference State] Get Current Conference",
    props<{ id: any }>()
)

export const loadCurrentConfferenceForIdSuccess = createAction(
    "[Conference State] Get Current Conference Success",
    props<{ conference: any }>()
)

export const loadAvailableConferences = createAction(
    "[Conference State] Get Available Conferences",
    props<{ startDate: any, endDate?: any }>()
)

export const loadAvailableConferencesSuccess = createAction(
    "[Conference State] Get Available Conferences Success",
    props<{ conferences: any }>()
)

export const loadUserConferences = createAction(
    "[Conference State] Get User Conferences",
    props<{ userName: any }>()
)

export const loadUserConferencesSuccess = createAction(
    "[Conference State] Get User Conferences Success",
    props<{ conferences: any }>()
)

export const getUserInterestedConferences = createAction(
    "[Conference State] Get User Interested Conferences",
    props<{ userName: string }>()
)

export const getUserInterestedConferencesSuccess = createAction(
    "[Conference State] Get User Interested Conferences Success",
    props<{ conferences: any }>()
)

export const addNewConference = createAction(
    "[Conference State] Add New Conference",
    props<{ conference: any }>()
)

export const addFavouriteConference = createAction(
    "[Conference State] Add Favourite Conference",
    props<{ userId: any, conferenceId: any }>()
)

export const removeConference = createAction(
    "[Conference State] Remove Conference",
    props<{ conferenceId: any }>()
)

export const removeFavouriteConference = createAction(
    "[Conference State] Remove Favourite Conference",
    props<{ userId: any, conferenceId: any }>()
)