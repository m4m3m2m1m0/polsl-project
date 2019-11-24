import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {

  constructor(
    protected _http: HttpClient
  ) { }

  // Mock conferences //
  confList = [{ name: 'conf1', latitude: 50.29761, longitude: 18.67658, date: '11/24/2019' }, { name: 'conf2', latitude: 50.21759, longitude: 18.37653, date: '11/10/2019' },
  { name: 'conf3', latitude: 48.29761, longitude: 17.67658, date: '12/02/2019' },{ name: 'conf4', latitude: 52.29761, longitude: 19.67658, date: '12/22/2019' }]


  getAvailableConferences(startDate: any, endDate: any): Observable<any> {

    let tempList = [];
    this.confList.forEach(conf => {
      if (endDate > new Date(conf.date)) tempList.push(conf);
    });

    console.log(tempList)
    return of(tempList);
    // const url = `${environment.baseServerUrl}/conferences`;
    // return this._http
    //   .post<User>(url, loginForm);
  }
  
}
