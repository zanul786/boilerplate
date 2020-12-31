import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  BASE_URL = `/api/admin/user`;
  constructor(private http: HttpClient) { }

  getAllUsers = ()=>{
    return this.http.get(`${this.BASE_URL}`).pipe(map((res: any) => res));
  }

  getOne = (userId)=>{
    return this.http.get(`${this.BASE_URL}/${userId}`).pipe(map((res: any) => res));
  }

}
