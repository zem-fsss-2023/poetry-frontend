import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PoetryService {

  constructor(private httpClient: HttpClient) { }

  getPoets(): Observable<any> {
    return this.httpClient.get('https://fsss-poetry.azurewebsites.net/api/poets');
  }


  getPoems(poetName: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('poet', poetName);

    return this.httpClient.get('https://fsss-poetry.azurewebsites.net/api/poems', {params: params});
  }
}
