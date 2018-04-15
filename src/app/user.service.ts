import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthService } from './auth/auth.service';

@Injectable()
export class UserService implements OnInit {
  user: {
    name: {
      first: string;
      last: string;
    };
    email: string;
  };

  state: 'LOGGED_IN' | 'NOT_LOGGED_IN';

  constructor(private authService: AuthService) {

  }

  ngOnInit = () => {

  }

  setUser = (user) => {
    this.user = user;
    this.state = 'LOGGED_IN';
  }

  unsetUser = () => {
    this.user = null;
    this.state = 'NOT_LOGGED_IN';
  }



}
