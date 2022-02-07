import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PAGES } from '../../utils/pages.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.url.subscribe((url) => {
      this.title = Object.values(PAGES).find(
        (page) => page.url === url[0].path
      ).title;
    });
  }
}
