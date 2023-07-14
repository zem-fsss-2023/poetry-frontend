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
  poetEntered: boolean = false;
  poetName: string = '';
  poems: any = [];
  poets: string[] = [];

  topicInput: string = ''
  topics: string[] = [];
  generatedPoem: string[] = [];

  wikiTitle: string = '';
  wikiContent: string = '';

  searchButtonDisabled: boolean = false;
  writeButtonDisabled: boolean = false;

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
    this.wikiTitle = '';
    this.wikiContent = '';

    this.searchButtonDisabled = true;

    this.poetryService.getPoems(this.poetName).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(response => {
      this.poems = response;
      this.searchButtonDisabled = false;
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
    this.writeButtonDisabled = true;
    this.generatedPoem = [];

    this.gptService.writePoem(this.poetName, this.topics).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(response => {
      this.generatedPoem = response.split(/\r?\n/);
      this.writeButtonDisabled = false;
      this.topics = [];
    });
  }

  ngOnDestroy(): void {
      this.ngUnsubscribe$.next(null);
      this.ngUnsubscribe$.complete();
  }
}
