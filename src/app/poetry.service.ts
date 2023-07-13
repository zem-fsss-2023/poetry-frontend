import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PoetryService {

  constructor(private httpClient: HttpClient) { }
  getPoets(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/poets');
  }
}
