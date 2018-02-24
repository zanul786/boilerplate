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

  constructor(private authService: AuthService) { }

  ngOnInit = () => {
  }

  setUser = (user) => {
    this.user = user;
  }

  unsetUser = () => {
    this.user = null;
  }



}
