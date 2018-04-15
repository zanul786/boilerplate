import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  BASE_URL = `/api/auth`;

  constructor(private http: HttpClient) { }
  me = () => {
    const PATH = `${this.BASE_URL}/me`;
    return this.http.get(PATH)
      .subscribe((res: any) => res.data);
  }

  register = (user) => {
    const PATH = `${this.BASE_URL}/register`;
    return this.http.post(PATH, { user })
      .subscribe((res: any) => res.data);
  }

  login = (user) => {
    const PATH = `${this.BASE_URL}/login`;
    return this.http.post(PATH, { user })
      .subscribe((res: any) => res.data);
  }
}
