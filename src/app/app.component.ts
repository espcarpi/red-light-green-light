import { Component } from '@angular/core';

import { PAGES } from './constants/pages.constant';
import { Page } from './models/page.model';

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
