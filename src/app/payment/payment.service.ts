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
      'saveThisCard': saveThisCard
    };
    return this.http.post(PATH, { chargeData })
      .map((res: any) => res);
  }

  createSavedCharge = () => {
    const PATH = `${this.BASE_URL}/charge/savedCard`;
    const chargeData = {
      'amount': 2000
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
