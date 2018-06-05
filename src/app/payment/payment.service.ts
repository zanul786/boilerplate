import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PaymentService {
  BASE_URL = `/api/payment`;

  constructor(private http: HttpClient) { }

  createCharge = (chargeData) => {
    const PATH = `${this.BASE_URL}/charge/create`;
    return this.http.post(PATH, { chargeData })
      .map((res: any) => res);
  }

  createSavedCharge = (chargeData) => {
    const PATH = `${this.BASE_URL}/charge/savedCard`;
    return this.http.post(PATH, { chargeData })
      .map((res: any) => res);
  }


  chargeGuestCard = (chargeData) => {
    const PATH = `${this.BASE_URL}/charge/guestCard`;
    return this.http.post(PATH, { chargeData })
      .map((res: any) => res);
  }

  retrieveSavedCard = () => {
    const PATH = `${this.BASE_URL}/getSavedCard`;
    return this.http.get(PATH)
      .map((res:any) => res);
  }

}
