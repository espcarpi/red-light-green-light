import { Component } from '@angular/core';

import { Page, PAGES } from './utils/pages.constant';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  appPages: Page[] = Object.values(PAGES).sort(
    (page, previous) => page.position - previous.position
  );

  constructor() {}
}
