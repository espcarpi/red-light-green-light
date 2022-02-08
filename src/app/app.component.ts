import { Component } from '@angular/core';

import { PAGES } from './constants/pages.constant';
import { Page } from './models/page.model';
import { PageService } from './services/page.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  actualPage: Page;
  appPages: Page[] = Object.values(PAGES).sort(
    (page, previous) => page.position - previous.position
  );

  constructor(private readonly pageService: PageService) {
    this.pageService.pageInfo.subscribe((page) => (this.actualPage = page));
  }
}
