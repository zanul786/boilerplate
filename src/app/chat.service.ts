import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from './../environments/environment';

const API_URL = `${environment.apiUrl}chat`;

@Injectable()
export class ChatService {
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

    public update(chat: any): Observable<any> {
        return this.http
            .put(`${API_URL}/${chat._id}`, { update: chat })
            .catch(this.handleError);
    }

    public create(chat: any) {
        return this.http
            .post(API_URL, { chat })
            .catch(this.handleError);
    }

    public delete(_id: string) {
        const url = `${API_URL}${_id}`;
        return this.http
            .delete(url)
            .catch(this.handleError);
    }


    private handleError = (error: Response | any) => {
        console.error('ChatService::handleError', error);
        return Observable.throw(error);
    }


    public listOfUser() {
        const url = `${API_URL}/listOfUser`;
        return this.http
            .get(url)
            .catch(this.handleError);
    }

    public getUserConversation(from, to) {
        const url = `${API_URL}/getUserConversation`;
        return this.http
            .post(url, { from, to })
            .catch(this.handleError);
    }
}
