import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthService } from './auth/auth.service';

@Injectable()
export class UserService implements OnInit {
  JWT_LOCALSTORAGE_KEY: 'jwt';
  user: {
    name: {
      first: string;
      last: string;
    };
    email: string;
  };

  state: 'LOGGED_IN' | 'NOT_LOGGED_IN';

  constructor(private authService: AuthService, private $window: Window) {

  }

  ngOnInit = () => {
    this.authService.me()
      .subscribe(({ user, token }) => {
        if (user) {
          this.setUser(user);
        } else {
          this.unsetUser();
        }
      });
  }

  setUser = ({ user, token }) => {
    this.user = user;
    this.state = 'LOGGED_IN';
    this.setToken(token);
  }

  unsetUser = () => {
    this.user = null;
    this.state = 'NOT_LOGGED_IN';
  }

  setToken = (token) => {
    return this.$window.localStorage.setItem(this.JWT_LOCALSTORAGE_KEY, token || '');
  }

  getToken = (): string => {
    return this.$window.localStorage.getItem(this.JWT_LOCALSTORAGE_KEY);
  }

  isAuthenticated = (): boolean => {
    return !!this.getToken();
  }

}
