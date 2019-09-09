import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MK_API } from 'app/app.api';
import { MK_TOKEN } from 'app/app.token';

 
const headers = new HttpHeaders({ 'x-api-key': MK_TOKEN });
@Injectable()
 
export class ForgotPasswordService {

    constructor(
        private http: HttpClient
        ) { }


    recover(username: string) { 
        return this.http.post(MK_API + '/api/Authentication/Recorver', { login: username }, { headers: headers })
            .map(data => {
                return data; 
            });
    } 
}
