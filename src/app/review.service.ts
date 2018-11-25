import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from './../environments/environment';

const API_URL = `${environment.apiUrl}review`;

@Injectable()
export class ReviewService {
    constructor(private http: HttpClient) {
    }

    public getAll(data?: any): Observable<{ conversations: any[] }> {
        return this.http
            .get(API_URL, { params: data })
            .catch(this.handleError);
    }

    public getOne(documentId: string): Observable<any> {
        return this.http
            .get(`${API_URL}/${documentId}`)
            .catch(this.handleError);
    }

    public update(review: any): Observable<any> {
        return this.http
            .put(`${API_URL}/${review._id}`, { update: review })
            .catch(this.handleError);
    }

    public create(review: any) {
        return this.http
            .post(API_URL, { review })
            .catch(this.handleError);
    }

    public delete(_id: string) {
        const url = `${API_URL}${_id}`;
        return this.http
            .delete(url)
            .catch(this.handleError);
    }

    private handleError = (error: Response | any) => {
        console.error('ReviewService::handleError', error);
        return Observable.throw(error);
    }
}
