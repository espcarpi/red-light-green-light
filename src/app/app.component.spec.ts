import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { PAGES } from './constants/pages.constant';
import { PageService } from './services/page.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const loginPage = PAGES.login;

  const pageServiceMock = {
    pageInfo: of(loginPage)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: PageService,
          useValue: pageServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('On initialization', () => {
    it('Should set actual Page from PageService', () => {
      expect(component.actualPage).toEqual(loginPage);
    });

    it('Should set pages ordered by position', () => {
      const pagesOrdered = Object.values(PAGES).sort(
        (page, previous) => page.position - previous.position
      );

      expect(component.appPages).toEqual(pagesOrdered);
    });
  });
});
