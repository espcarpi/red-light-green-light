import { fakeAsync, TestBed } from '@angular/core/testing';

import { User } from '../models/user.model';
import { StorageService } from './storage.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const userMock: User = {
    record: 5,
    score: 4,
    username: 'any username'
  };
  const usersMock: User[] = [{ ...userMock }];

  const storageServiceMock = {
    get: jasmine.createSpy().and.returnValue(Promise.resolve(usersMock)),
    set: jasmine.createSpy()
  };

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        {
          provide: StorageService,
          useValue: storageServiceMock
        }
      ]
    });
    service = TestBed.inject(UserService);
  }));

  describe('On initialization', () => {
    it('should get the users from storageService', () => {
      expect(storageServiceMock.get).toHaveBeenCalled();
    });
  });

  describe('Setting actual user', () => {
    describe('With previous user', () => {
      beforeEach(() => {
        service.setActualUser(userMock.username);
      });

      it('Should set the previous user as actual user', () => {
        expect(service.getActualUser()).toEqual(userMock);
      });
    });

    describe('Without previous user', () => {
      const newUser: User = {
        record: 0,
        score: 0,
        username: 'other username'
      };
      beforeEach(() => {
        service.setActualUser(newUser.username);
      });

      it('Should set the previous user as new user', () => {
        expect(service.getActualUser()).toEqual(newUser);
      });

      it('Should save the new user to the users', () => {
        expect(storageServiceMock.set).toHaveBeenCalledWith([
          ...usersMock,
          newUser
        ]);
      });
    });
  });

  describe('Saving the user', () => {
    it('Should set the users in the storage', () => {
      const newUser = { username: 'new', record: 18, score: 7 };
      service.setActualUser(newUser.username);
      service.saveUser(newUser);
      expect(storageServiceMock.set).toHaveBeenCalledWith([
        ...usersMock,
        newUser
      ]);
    });
  });

  it('Should return the ranking of people ordered', () => {
    const bestOne: User = {
      record: 100,
      score: 0,
      username: 'the best'
    };
    service.setActualUser(bestOne.username);
    service.saveUser(bestOne);

    expect(service.getRanking()).toEqual([bestOne, userMock]);
  });
});
