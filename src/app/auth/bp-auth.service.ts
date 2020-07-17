
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BPAuthService {
  BASE_URL = `/api/auth`;
  constructor(private http: HttpClient) { }
  me = () => {
    const PATH = `${this.BASE_URL}/me`;
    return this.http.get(PATH).pipe(
      map((res: any) => res));
  }

  register = (user) => {
    let route;
    if (user.oauth) {
      route = '/registerOauth';
    } else {
      route = '/register';
    }
    const PATH = `${this.BASE_URL}/${route}`;
    return this.http.post(PATH, { user }).pipe(
      map((res: any) => res),
      catchError((error: any) => observableThrowError(error.error || 'Server error')),);
  }

  login = (user) => {
    let route;
    if (user.oauth) {
      route = '/loginOauth';
    } else {
      route = '/login';
    }
    const PATH = `${this.BASE_URL}/${route}`;
    return this.http.post(PATH, { user }).pipe(
      map((res: any) => res),
      catchError((error: any) => observableThrowError(error.error || 'Server error')),);
  }

  sendLink = (email) => {
    const route = '/send-reset-email';
    const PATH = `${this.BASE_URL}/${route}`;
    return this.http.post(PATH, { email }).pipe(
      map((res: any) => res),
      catchError((error: any) => observableThrowError(error.error || 'Server error')),);
  }

  resetPassword = (data) => {
    const route = '/update-password';
    const PATH = `${this.BASE_URL}/${route}`;
    return this.http.post(PATH, { data }).pipe(
      map((res: any) => res),
      catchError((error: any) => observableThrowError(error.error || 'Server error')),);
  }

  changePassword = (passwordDetails) => {
    const PATH = `${this.BASE_URL}/changePassword`;
    return this.http.post(PATH, { passwordDetails }).pipe(
      map((res: any) => res),
      catchError((error: any) => observableThrowError(error.error || 'Server error')),);
  }

  unsubscribe = (id) => {
    const PATH = `${this.BASE_URL}/${id}/unsubscribe`;
    return this.http.put(PATH, { user: { subscribedToNewsletter: false } }).pipe(
      map(res => res),
      catchError((error: any) => observableThrowError(error.error || 'Server Error')),);
  }
}
