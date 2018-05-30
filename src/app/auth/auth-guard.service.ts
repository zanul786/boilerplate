import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../user.service';
// import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public router: Router, public service: UserService) {}
  canActivate(): boolean {
    if (!this.service.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
