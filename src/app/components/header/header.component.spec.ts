import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

import { PAGES } from '../../constants/pages.constant';
import { PageService } from '../../services/page.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const page = PAGES.login;
  const pageServiceMock = {
    pageInfo: of(page)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: PageService,
          useValue: pageServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set the title depending of the page', () => {
    expect(component.title).toEqual(page.title);
  });
});
