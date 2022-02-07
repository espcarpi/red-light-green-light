import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  const userMock: User = {
    record: 0,
    score: 0,
    username: 'any username'
  };
  const userServiceMock = {
    getActualUser: jasmine.createSpy().and.returnValue(userMock),
    saveUser: jasmine.createSpy()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: UserService, useValue: userServiceMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('On initialization', () => {
    it('should set user from User service', () => {
      expect(component.user).toEqual(userMock);
    });

    it('should set steps available', () => {
      expect(component.available).toBeTrue();
    });
  });

  describe('Clicking anywhere in the page', () => {
    beforeEach(() => {
      component.user.score = 1;
    });

    it('should set user score to 0 when it is not availble', () => {
      component.available = false;
      component.onClick();
      expect(component.user.score).toBe(0);
    });

    it('should not set user score to 0 when it is availble', () => {
      component.available = true;
      component.onClick();
      expect(component.user.score).toBe(1);
    });

    it('should save user', () => {
      component.onClick();
      expect(userServiceMock.saveUser).toHaveBeenCalledWith(component.user);
    });
  });

  describe('Getting steps in the page', () => {
    beforeEach(() => {
      component.user.score = 0;
      component.user.record = 0;
    });

    it('should set user score to 0 when it is not availble', () => {
      component.available = false;
      component.setScore(1);
      expect(component.user.score).toBe(0);
    });

    it('should not set user score to 0 when it is availble', () => {
      component.available = true;
      component.setScore(1);
      expect(component.user.score).toBe(1);
    });

    it('should save user', () => {
      component.setScore(1);
      expect(userServiceMock.saveUser).toHaveBeenCalledWith(component.user);
    });

    it('should set the record user if it has been reached', () => {
      component.setScore(1);
      expect(component.user.record).toBe(1);
    });

    it('should not set the record user if it has been reached', () => {
      const recordMock = 100;
      component.user.record = recordMock;
      component.setScore(1);
      expect(component.user.record).toBe(recordMock);
    });
  });
});
