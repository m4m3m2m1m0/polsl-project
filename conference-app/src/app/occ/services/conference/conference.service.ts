import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Conference } from 'src/app/models/conference.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {

  constructor(
    protected _http: HttpClient
  ) { }

  getAvailableConferences(startDate?: any, endDate?: any): Observable<any> {
    const url = `${environment.baseServerUrl}/conference`;
    return this._http
      .get<any>(url);
  }

  getConferenceForId(conferenceId: string): Observable<any> {
    const url = `${environment.baseServerUrl}/conference/${conferenceId}`;
    return this._http
      .get<any>(url);
  }

  getUserInterestedConferences(userName: any) {
    const url = `${environment.baseServerUrl}/favoriteConverence?userId=${userName}`;
    return this._http
      .get<any>(url);
  }

  getUserConferences(userName: string) {
    const url = `${environment.baseServerUrl}/conference?userId=${userName}`;
    return this._http
      .get<any>(url);
  }

  addConference(conference: any) {
    const url = `${environment.baseServerUrl}/conference`;
    return this._http
      .post<Conference>(url, conference)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  addFavouriteConference(userName: string, conferenceId: string) {
    const url = `${environment.baseServerUrl}/conference`;
    return this._http
      .post<any>(url, { params: { userId: userName, conferenceId: conferenceId } })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  deleteConference(conference: any) {
    const url = `${environment.baseServerUrl}/conference`;
    return this._http
      .delete<Conference>(url, conference)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  deleteFavouriteConference(userName: string, conferenceId: string) {
    const url = `${environment.baseServerUrl}/conference`;
    return this._http
      .delete<any>(url, { params: { userId: userName, conferenceId: conferenceId } })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

}
