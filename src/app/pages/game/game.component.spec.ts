import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
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
  const vibrationMock = {
    vibrate: jasmine.createSpy()
  };

  let playAudioSpy;
  let pauseAudioSpy;
  let loadAudioSpy;

  beforeEach(() => {
    playAudioSpy = spyOn(window.HTMLAudioElement.prototype, 'play');
    pauseAudioSpy = spyOn(window.HTMLAudioElement.prototype, 'pause');
    loadAudioSpy = spyOn(window.HTMLAudioElement.prototype, 'load');

    TestBed.configureTestingModule({
      declarations: [GameComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Vibration, useValue: vibrationMock }
      ],
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

    it('should load the audio', () => {
      expect(loadAudioSpy).toHaveBeenCalled();
    });

    it('should play the audio', () => {
      expect(playAudioSpy).toHaveBeenCalled();
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

    it('should vibrate when it is not availble and user lose', () => {
      component.available = false;
      component.setScore(1);
      expect(vibrationMock.vibrate).toHaveBeenCalledWith(500);
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

    it('should vibrate if the user lose points', () => {
      component.user.score = 10;
      component.setScore(-1);
      expect(vibrationMock.vibrate).toHaveBeenCalledWith(250);
    });

    it('should vibrate if the user lose points and reach 0', () => {
      component.user.score = 1;
      component.setScore(-1);
      expect(vibrationMock.vibrate).toHaveBeenCalledWith(250);
      expect(vibrationMock.vibrate).toHaveBeenCalledWith(500);
    });
  });

  describe('Checking the availability of the game', () => {
    it('Should be green at the beggining', () => {
      expect(component.available).toBeTrue();
    });

    it('Should be red in 10 seconds if there is no points (+/- 1.5 sec)', fakeAsync(() => {
      tick(11500);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.available).toBeFalse();
      });
    }));

    it('Should stop music in 10 seconds if there is no points (+/- 1.5 sec)', fakeAsync(() => {
      tick(11500);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(pauseAudioSpy).toHaveBeenCalled();
      });
    }));
  });

  describe('When the component is destroyed', () => {
    it('should save the user information', () => {
      userServiceMock.saveUser.calls.reset();

      component.ngOnDestroy();
      expect(userServiceMock.saveUser).toHaveBeenCalledOnceWith(component.user);
    });

    it('should clear any timeout running', () => {
      const clearTimeoutSpy = spyOn(window, 'clearTimeout').and.callThrough();

      component.ngOnDestroy();
      expect(clearTimeoutSpy).toHaveBeenCalled();
    });

    it('should pause the song', () => {
      component.ngOnDestroy();
      expect(pauseAudioSpy).toHaveBeenCalled();
    });
  });
});
