import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GptService {

  constructor(private httpClient: HttpClient) { 

  }

  writePoem(poetName: string, topics: string[]): Observable<any> {
    const body = {
      poet: poetName,
      topics: topics
    };

    return this.httpClient.post('http://localhost:8080/api/gpt', body, { responseType: 'text' });
  }
}
