import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';


export const loginUser = createAction(
    "[User State] Login User",
    props<{ loginForm: any }>()
)

export const loginUserSuccess = createAction(
    "[User State] Logout User Success",
    props<{ user: User }>()
);

export const logoutUser = createAction(
    "[User State] Logout User"
);

export const registerUser = createAction(
    "[User State] Register User",
    props<{ registerForm: any }>()
);

export const registerUserSuccess = createAction(
    "[User State] Register User Success",
    props<{ user: User }>()
);

