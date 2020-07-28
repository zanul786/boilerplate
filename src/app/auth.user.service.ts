import { Injectable } from '@angular/core';

@Injectable()
export class AuthUserService {
  JWT_LOCALSTORAGE_KEY = 'jwt';
  user: {
    name: {
      first: string;
      last: string;
    };
    email: string;
  };

  constructor() {}

  setUser = ({ user, token }) => {
    this.user = user;
    window.localStorage.setItem('user', JSON.stringify(this.user));
    this.setToken(token);
  };

  getUser = () => {
    return JSON.parse(window.localStorage.getItem('user'));
  };

  unsetUser = () => {
    this.user = null;
    window.localStorage.removeItem('user');
    window.localStorage.removeItem(this.JWT_LOCALSTORAGE_KEY);
  };

  setToken = (token) => {
    return window.localStorage.setItem(this.JWT_LOCALSTORAGE_KEY, token || '');
  };

  getToken = (): string => {
    return window.localStorage.getItem(this.JWT_LOCALSTORAGE_KEY) || '';
  };

  isAuthenticated = (): boolean => {
    return !!this.getToken();
  };
}
