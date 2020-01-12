import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducers';


export const selectUserState = createFeatureSelector<UserState>("user");

export const isUserLogged = createSelector(
    selectUserState,
    state => state.userLogged
);

export const selectUser = createSelector(
    selectUserState,
    state => state.user
);

export const selectUserToken = createSelector(
    selectUserState,
    state => state.userToken
)