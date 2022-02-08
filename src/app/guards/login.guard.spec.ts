import { Router } from '@angular/router';

import { PAGES } from '../constants/pages.constant';
import { UserService } from '../services/user.service';
import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let routerSpy: jasmine.SpyObj<Router>;
  let serviceStub: Partial<UserService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    serviceStub = {};
    guard = new LoginGuard(serviceStub as UserService, routerSpy);
  });

  describe('when the user is logged in', () => {
    it('Should return true', () => {
      serviceStub.getActualUser = jasmine.createSpy().and.returnValue(true);
      expect(guard.canActivate(undefined, undefined)).toBeTrue();
    });
  });

  describe('when the user is logged out', () => {
    beforeEach(() => {
      serviceStub.getActualUser = jasmine.createSpy().and.returnValue(false);
    });

    it('Should navigate to login page', () => {
      guard.canActivate(undefined, undefined);
      expect(routerSpy.navigate).toHaveBeenCalledWith([PAGES.login.url]);
    });

    it('Should return false', () => {
      expect(guard.canActivate(undefined, undefined)).toBeFalse();
    });
  });
});
