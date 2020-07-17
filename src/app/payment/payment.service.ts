import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  BASE_URL = `/api/payment`;
  stripe = new Stripe(environment.stripePublishableKey, {
    apiVersion: '2020-03-02',
  });

  constructor(private http: HttpClient) {}

  createCharge = (chargeData) => {
    const PATH = `${this.BASE_URL}/charge/create`;
    return this.http.post(PATH, { chargeData }).pipe(map((res: any) => res));
  };

  createSavedCharge = (chargeData) => {
    const PATH = `${this.BASE_URL}/charge/savedCard`;
    return this.http.post(PATH, { chargeData }).pipe(map((res: any) => res));
  };

  chargeGuestCard = (chargeData) => {
    const PATH = `${this.BASE_URL}/charge/guestCard`;
    return this.http.post(PATH, { chargeData }).pipe(map((res: any) => res));
  };

  retrieveSavedCard = () => {
    const PATH = `${this.BASE_URL}/getSavedCard`;
    return this.http.get(PATH).pipe(map((res: any) => res));
  };

  savePaypalPayment = (paypalResponse) => {
    const PATH = `${this.BASE_URL}/savePayPalPayment`;
    return this.http
      .post(PATH, { paypalResponse })
      .pipe(map((res: any) => res));
  };

  saveCard = (chargeData) => {
    const PATH = `${this.BASE_URL}/saveCard`;
    return this.http.post(PATH, { chargeData }).pipe(map((res: any) => res));
  };

  deleteCard = (chargeData) => {
    const PATH = `${this.BASE_URL}/deleteCard`;
    return this.http.post(PATH, { chargeData }).pipe(map((res: any) => res));
  };
}
