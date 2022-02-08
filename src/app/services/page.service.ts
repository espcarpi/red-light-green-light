import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { PAGES } from '../constants/pages.constant';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  pageInfo: BehaviorSubject<Page> = new BehaviorSubject<Page>(undefined);

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.pageInfo.next(
          Object.values(PAGES).find((page) => `/${page.url}` === event.url)
        );
      }
    });
  }
}
