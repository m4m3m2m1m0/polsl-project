
import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { UserActions } from './user-action-types';

export interface UserState {
    user: User;
}

export const initialUserState: UserState = {
    user: undefined,
};

export const userReducer = createReducer(
    initialUserState,
    on(UserActions.logoutUser, (state, action) => {
        return {
            ...state,
            user: undefined
        }
    }),
    on(UserActions.loginUserSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    })
)
