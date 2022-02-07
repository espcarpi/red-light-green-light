import { fakeAsync, TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  const storageKey = 'RedLightGreenLigth';
  let store = 'any';

  const _storageMock = {
    get: jasmine.createSpy().and.returnValue(Promise.resolve(store)),
    set: jasmine.createSpy().and.callFake((value) => (store = value))
  };

  const storageMock = {
    create: jasmine.createSpy().and.returnValue(Promise.resolve(_storageMock))
  };

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [StorageService, { provide: Storage, useValue: storageMock }]
    });
    service = TestBed.inject(StorageService);
  }));

  it('should set storage when init the service', fakeAsync(() => {
    service.init().then(() => {
      service.get().then((result) => {
        expect(result).toBe('any');
      });
    });
  }));

  it('should get from storage', fakeAsync(() => {
    service.init().then(() => {
      service.get().then((result) => {
        expect(_storageMock.get).toHaveBeenCalledWith(storageKey);
      });
    });
  }));

  it('should set in storage', fakeAsync(() => {
    service.init().then(() => {
      service.set('other');
      expect(_storageMock.set).toHaveBeenCalledWith(storageKey, 'other');
    });
  }));
});
