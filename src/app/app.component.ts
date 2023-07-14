import { Component, OnDestroy } from '@angular/core';
import { WikiServiceService } from './wiki-service.service';
import { Subject, takeUntil } from 'rxjs';
import { GptService } from './gpt.service';
import { PoetryService } from './poetry.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'poetry-frontend';
  poetEntered: boolean = false;
  poetName: string = '';
  poems: any = [];
  poets: string[] = [];

  topicInput: string = ''
  topics: string[] = [];
  generatedPoem: string[] = [];

  wikiTitle: string = '';
  wikiContent: string = '';

  private ngUnsubscribe$ = new Subject();

  constructor(
    private wikiService: WikiServiceService,
    private gptService: GptService,
    private poetryService: PoetryService) {

      this.getPoets();
  }

  getPoets() {
    this.poetryService.getPoets().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(response => {
      this.poets = response;
    });
  }

  getPoems() {
    this.poetEntered = true;
    this.topicInput = '';
    this.topics = [];
    this.generatedPoem = [];

    this.poetryService.getPoems(this.poetName).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(response => {
      this.poems = response;
    });

    this.wikiService.getWiki(this.poetName).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(response => {
      this.wikiTitle = response.title;
      this.wikiContent = response.parsedParagraphs[0];
    });
  }

  addTopic() {
    if (this.topicInput.length != 0) {
      this.topics.push(this.topicInput);
      this.topicInput = '';
    }
  }

  writePoem() {
    this.generatedPoem = [];
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
