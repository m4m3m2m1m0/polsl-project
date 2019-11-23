
import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { UserActions } from './user-action-types';

export interface UserState {
    user: User;
    userLogged: boolean
}

export const initialUserState: UserState = {
    user: undefined,
    userLogged: false
};

export const userReducer = createReducer(
    initialUserState,
    on(UserActions.logoutUser, (state, action) => {

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("token_type");
        localStorage.removeItem("user");
        
        return {
            ...state,
            user: undefined,
            userLogged: false
        }
    }),
    on(UserActions.loginUserSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    }),
    on(UserActions.loginUserSuccess, (state, action) => {
        return {
            ...state,
            user: action.user,
            userLogged: true
        }
    }),
)
