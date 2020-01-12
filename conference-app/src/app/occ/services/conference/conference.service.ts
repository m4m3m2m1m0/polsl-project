import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Conference } from 'src/app/models/conference.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {

  constructor(
    protected _http: HttpClient
  ) { }

  // Mock conferences //
  confList = [
    { id: '1', name: 'conf1', startDate: '11/24/2020', endDate: '11/27/2020', category: "Java", description: "Description 1", priceRange: { lowest: 500, highest: 1000, currency: '$' }, hashtags: ["#Java", "#Full Stack", "#Spring"], address: { country: 'Poland', city: 'Gliwice', postalCode: "44-100", street: "Kujawska", householdNumber: "2", latitude: 50.29761, longitude: 18.67658, }, contact: { url: "www.google.com", phone: "888-888-888", email: "xyz@gmail.com" } },
    { id: '2', name: 'conf2', startDate: '11/10/2020', endDate: '11/15/2020', category: "Dev Ops", description: "Description 2", priceRange: { lowest: 900, highest: 1500, currency: '$' }, hashtags: ["#JS", "#Angular", "#React", "#View"], address: { latitude: 50.21759, longitude: 18.37653, country: 'Russia', city: 'Głogów', postalCode: "44-100", street: "Kujawska", householdNumber: "2" }, contact: { url: "www.google.com", phone: "888-888-888", email: "xyz@gmail.com" } },
    { id: '3', name: 'conf3', startDate: '12/02/2020', endDate: '12/07/2020', category: "Java Script", description: "Description 3", priceRange: { lowest: 200, highest: 800, currency: '$' }, hashtags: ["#Conf"], address: { latitude: 48.29761, longitude: 17.67658, country: 'United Kingdom', city: 'Katowice', postalCode: "44-100", street: "Kujawska", householdNumber: "2" }, contact: { url: "www.google.com", phone: "888-888-888", email: "xyz@gmail.com" } },
    { id: '4', name: 'conf4', startDate: '12/15/2019', endDate: '12/27/2019', category: "Dev Ops", description: "Description 4", priceRange: { lowest: 600, highest: 1200, currency: '$' }, hashtags: ["#Conf"], address: { latitude: 52.29761, longitude: 19.67658, country: 'Poland', city: 'Kraków', postalCode: "44-100", street: "Kujawska", householdNumber: "2" }, contact: { url: "www.google.com", phone: "888-888-888", email: "xyz@gmail.com" } },
    { id: '5', name: 'conf5', startDate: '12/02/2021', endDate: '12/07/2021', category: "Dev Ops", description: "Description 5", priceRange: { lowest: 2000, highest: 2500, currency: '$' }, hashtags: ["#Conf"], address: { latitude: 48.29761, longitude: 17.67658, country: 'Poland', city: 'Warszawa', postalCode: "44-100", street: "Kujawska", householdNumber: "2" }, contact: { url: "www.google.com", phone: "888-888-888", email: "xyz@gmail.com" } }];

  favouriteConfList = [
    { id: '1', name: 'conf1', startDate: '11/24/2020', endDate: '11/27/2020', category: "Java", description: "Description 1", priceRange: { lowest: 500, highest: 1000, currency: '$' }, hashtags: ["#Java", "#Full Stack", "#Spring"], address: { latitude: 50.29761, longitude: 18.67658, country: 'Poland', city: 'Gliwice', postalCode: "44-100", street: "Kujawska", householdNumber: "2" }, contact: { url: "www.google.com", phone: "888-888-888", email: "xyz@gmail.com" } },
    { id: '3', name: 'conf3', startDate: '12/02/2020', endDate: '12/07/2020', category: "Java Script", description: "Description 3", priceRange: { lowest: 200, highest: 800, currency: '$' }, hashtags: ["#Conf"], address: { latitude: 48.29761, longitude: 17.67658, country: 'United Kingdom', city: 'Katowice', postalCode: "44-100", street: "Kujawska", householdNumber: "2" }, contact: { url: "www.google.com", phone: "888-888-888", email: "xyz@gmail.com" } }];


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
    const url = `${environment.baseServerUrl}/conference`;
    return this._http
      .get<any>(url);
  }

  addConference(conference: any) {

    const url = `${environment.baseServerUrl}/conference`;
    return this._http
      .post<Conference>(url, conference)
      .pipe(catchError((error: any) => throwError(error.json())));      
  }

}
