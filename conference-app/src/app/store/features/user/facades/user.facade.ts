import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserActions } from '../user-store/user-action-types';
import { UserState } from '../user-store/user.reducers';
import { isUserLogged, selectUser } from '../user-store/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserFacade {

  constructor(
    protected _store: Store<UserState>
  ) { }

  getCurrentUser(): Observable<any> {
    return this._store.select(selectUser);
  }

  isUserLogged(): Observable<boolean> {
    return this._store.select(isUserLogged);
  }

  loginUser(loginForm: any): void {
    return this._store.dispatch(UserActions.loginUser({ loginForm }));
  }

  logutUser(): void {
    return this._store.dispatch(UserActions.logoutUser());
  }

  registerUser(registerForm: any): void {
    this._store.dispatch(UserActions.registerUser({ registerForm }));
  }

  setUserToken(authToken: string): void {
    this._store.dispatch(UserActions.setUserToken({ token: authToken }));
  }

}
