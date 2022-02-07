import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { RankingComponent } from './ranking.component';

describe('RankingComponent', () => {
  let component: RankingComponent;
  let fixture: ComponentFixture<RankingComponent>;

  const userMock: User = {
    record: 0,
    score: 0,
    username: 'any username'
  };

  const users: User[] = [{ ...userMock }, { ...userMock, record: 10 }];

  const userServiceMock = {
    getActualUser: jasmine.createSpy().and.returnValue(userMock),
    getRanking: jasmine.createSpy().and.returnValue(users)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RankingComponent],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: UserService, useValue: userServiceMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('On initialization', () => {
    it('should set the ranking', () => {
      expect(component.ranking).toEqual(users);
    });

    it('should set the actual user', () => {
      expect(component.actualUser).toEqual(userMock.username);
    });
  });
});
