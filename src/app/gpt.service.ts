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

    return this.httpClient.post('https://fsss-poetry.azurewebsites.net/api/gpt', body, { responseType: 'text' });
  }
}
