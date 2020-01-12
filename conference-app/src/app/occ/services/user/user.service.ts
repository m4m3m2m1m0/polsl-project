import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    protected _http: HttpClient
  ) { }

  loginUser(loginForm: any): Observable<any> {
    const url = `${environment.baseServerUrl}/login`;
    return this._http
      .post<User>(url, loginForm);
  }

  registerUser(registerForm: any): Observable<any> {
    const url = `${environment.baseServerUrl}/register`;
    return this._http
      .post<User>(url, registerForm)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

}
