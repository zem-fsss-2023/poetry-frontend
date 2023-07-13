import { Component, OnDestroy } from '@angular/core';
import { WikiServiceService } from './wiki-service.service';
import { Subject, takeUntil } from 'rxjs';
import { GptService } from './gpt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'poetry-frontend';
  poetName: string = '';
  poems: any = [];

  topicInput: string = ''
  topics: string[] = [];
  generatedPoem: string[] = [];

  private ngUnsubscribe$ = new Subject();

  constructor(
    private wikiService: WikiServiceService,
    private gptService: GptService) {

  }

  getWiki() {

    this.topicInput = '';
    this.topics = [];
    this.generatedPoem = [];

    this.wikiService.getWiki(this.poetName).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(response => {
      this.poems = response;
    });
  }

  addTopic() {
    if (this.topicInput.length != 0) {
      this.topics.push(this.topicInput);
      this.topicInput = '';
    }
  }

  writePoem() {
    this.gptService.writePoem(this.poetName, []).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(response => {
      this.generatedPoem = response.split(/\r?\n/);
      console.log(this.generatedPoem)
    });

    this.topics = [];
  }

  ngOnDestroy(): void {
      this.ngUnsubscribe$.next(null);
      this.ngUnsubscribe$.complete();
  }
}
