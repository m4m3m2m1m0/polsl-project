import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  maxNews: number = 5;

  newses: Array<any> = [
    {
      subtitle: "name1 ",
      title: "test1",
      description: "description 1",
      date: '11/24/2020 10:22:10'
    },
    {
      subtitle: "name2 ",
      title: "test2",
      description: "description 2",
      date: '11/24/2020 18:15:10'
    }
  ];

  constructor() { }

  getNewestNews(): Observable<any> {

    return of(this.newses);
    // const url = `${environment.baseServerUrl}/news`;
    // return this._http
    //   .get<any>(url);
  }

}
