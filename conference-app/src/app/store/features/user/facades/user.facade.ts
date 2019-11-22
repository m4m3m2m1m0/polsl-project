import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from '../user-store/user-action-types';
import { UserState } from '../user-store/user.reducers';

@Injectable({
  providedIn: 'root'
})
export class UserFacade {

  constructor(
    protected _store: Store<UserState>
  ) { }

  loginUser(loginForm: any): void {
    this._store.dispatch(UserActions.loginUser({ loginForm }));
  }

  logutUser(): void {
    this._store.dispatch(UserActions.logoutUser());
  }

  registerUser(registerForm: any): void {
    this._store.dispatch(UserActions.registerUser({ registerForm }));
  }
  
}
