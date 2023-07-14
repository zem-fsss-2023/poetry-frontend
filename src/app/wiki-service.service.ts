import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WikiServiceService {
  constructor(private httpClient: HttpClient) { 

  }

  getWiki(poetName: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('title', poetName);

    return this.httpClient.get('https://fsss-poetry.azurewebsites.net/api/wiki', {params: params});
  }
}
