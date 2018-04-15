import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  BASE_URL = `/api/auth`;

  constructor(private http: Http) { }

  register = (user) => {
    const PATH = `${this.BASE_URL}/register`;
    return this.http.post(PATH, { user })
      .map(res => res.json());
  }

  login = (user) => {
    const PATH = `${this.BASE_URL}/login`;
    return this.http.post(PATH, { user })
      .map(res => res.json());
  }
}
