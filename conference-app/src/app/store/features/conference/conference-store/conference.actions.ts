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
    props<{ startDate: any, endDate: any }>()
)

export const loadAvailableConferencesSuccess = createAction(
    "[Conference State] Get Available Conferences Success",
    props<{ conferences: any }>()
)
