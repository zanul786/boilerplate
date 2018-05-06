import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PaymentService {
  BASE_URL = `/api/payment`;

  constructor(private http: HttpClient) { }

  createCharge = (token) => {
    const PATH = `${this.BASE_URL}/charge`;
    return this.http.post(PATH, { token })
      .map((res: any) => res);
  }

}
