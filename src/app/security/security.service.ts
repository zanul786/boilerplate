import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SecurityService {
  BASE_URL = `/api/security`;
  constructor(private http: Http) { }

  getData = (security: string) => {
    return this.http.get(this.BASE_URL, { params: { security } })
      .map(res => res.json());
  }
}
