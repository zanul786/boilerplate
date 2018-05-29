import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PaymentService {
  BASE_URL = `/api/payment`;

  constructor(private http: HttpClient) { }

  createCharge = (token, saveThisCard) => {
    const PATH = `${this.BASE_URL}/charge/create`;
    const chargeData = {
      'token': token,
      'amount': 2000,
      'currency': 'usd',
      'saveThisCard': saveThisCard
    };
    return this.http.post(PATH, { chargeData })
      .map((res: any) => res);
  }

  createSavedCharge = (card) => {
    const PATH = `${this.BASE_URL}/charge/savedCard`;
    const chargeData = {
      'currency': 'usd',
      'amount': 2000,
      'source':card.id
    };
    return this.http.post(PATH, { chargeData })
      .map((res: any) => res);
  }


  chargeGuestCard = (token, email) => {
    const PATH = `${this.BASE_URL}/charge/guestCard`;
    const chargeData = {
      'currency': 'usd',
      'amount': 2000,
      'token': token,
      'email': email
    };
    return this.http.post(PATH, { chargeData })
      .map((res: any) => res);
  }

  retrieveSavedCard = () => {
    const PATH = `${this.BASE_URL}/getSavedCard`;
    return this.http.get(PATH)
      .map((res:any) => res);
  }

}
