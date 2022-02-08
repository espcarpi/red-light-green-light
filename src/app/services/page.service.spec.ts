import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ReplaySubject } from 'rxjs';

import { PAGES } from '../constants/pages.constant';
import { PageService } from './page.service';

describe('PageService', () => {
  let service: PageService;

  const eventSubject = new ReplaySubject<RouterEvent>(1);
  const page = PAGES.login;

  const routerMock = {
    navigate: jasmine.createSpy(),
    events: eventSubject.asObservable(),
    url: page.url
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PageService,
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    });
    service = TestBed.inject(PageService);
    spyOn(service.pageInfo, 'next');
  });

  it('should triggered page info with a router change', () => {
    eventSubject.next(new NavigationEnd(1, `/${page.url}`, `/${page.url}`));
    expect(service.pageInfo.next).toHaveBeenCalledWith(PAGES.login);
  });
});
