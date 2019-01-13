import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
@Injectable()
export class BPAuthService {
  BASE_URL = `/api/auth`;
  constructor(private http: HttpClient) { }
  me = () => {
    const PATH = `${this.BASE_URL}/me`;
    return this.http.get(PATH)
      .map((res: any) => res);
  }

  register = (user) => {
    let route;
    if (user.oauth) {
      route = '/registerOauth';
    } else {
      route = '/register';
    }
    const PATH = `${this.BASE_URL}/${route}`;
    return this.http.post(PATH, { user })
      .map((res: any) => res)
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  login = (user) => {
    let route;
    if (user.oauth) {
      route = '/loginOauth';
    } else {
      route = '/login';
    }
    const PATH = `${this.BASE_URL}/${route}`;
    return this.http.post(PATH, { user })
      .map((res: any) => res)
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  sendLink = (email) => {
    const route = '/send-reset-email';
    const PATH = `${this.BASE_URL}/${route}`;
    return this.http.post(PATH, { email })
      .map((res: any) => res)
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  resetPassword = (data) => {
    const route = '/update-password';
    const PATH = `${this.BASE_URL}/${route}`;
    return this.http.post(PATH, { data })
      .map((res: any) => res)
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  changePassword = (passwordDetails) => {
    const PATH = `${this.BASE_URL}/changePassword`;
    return this.http.post(PATH, { passwordDetails })
      .map((res: any) => res)
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  unsubscribe = (id) => {
    const PATH = `${this.BASE_URL}/${id}/unsubscribe`;
    return this.http.put(PATH, { user: { subscribedToNewsletter: false } })
      .map(res => res)
      .catch((error: any) => Observable.throw(error.error || 'Server Error'));
  }
}
