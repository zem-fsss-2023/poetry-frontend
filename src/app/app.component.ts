import { Component, OnDestroy } from '@angular/core';
import { WikiServiceService } from './wiki-service.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'poetry-frontend';
  poetName: string = '';
  poems: any = [];
  private ngUnsubscribe$ = new Subject();

  constructor(private wikiService: WikiServiceService) {

  }

  getWiki() {
    this.wikiService.getWiki(this.poetName).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(response => {
      this.poems = response;
    });
  }

  ngOnDestroy(): void {
      this.ngUnsubscribe$.next(null);
      this.ngUnsubscribe$.complete();
  }
}
