import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  maxNews: number = 5;

  constructor(
    protected _http: HttpClient
  ) { }

  getNewestNews(): Observable<any> {
    const url = `${environment.baseServerUrl}/news?count=${this.maxNews}`;
    return this._http
      .get<any>(url);
  }

  getNewsForId(newsId: string): Observable<any> {
    const url = `${environment.baseServerUrl}/news/${newsId}`;
    return this._http
      .get<any>(url);
  }

  addNews(news: any): Observable<any> {
    const url = `${environment.baseServerUrl}/news`;
    return this._http
      .post<any>(url, news);
  }

  removeNews(news: any): Observable<any> {
    const url = `${environment.baseServerUrl}/news`;
    return this._http
      .delete<any>(url, { params: { news }});
  }

}
