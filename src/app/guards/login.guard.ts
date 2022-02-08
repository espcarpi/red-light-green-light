import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { PAGES } from '../constants/pages.constant';
import { UserService } from '../services/user.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userService.getActualUser()) {
      return true;
    } else {
      this.router.navigate([PAGES.login.url]);
      return false;
    }
  }
}
