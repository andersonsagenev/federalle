import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MK_API } from 'app/app.api';
import { MK_TOKEN } from 'app/app.token';
import { Login } from '../../authentication/login/login.model';
 
const headers = new HttpHeaders({ 'x-api-key': MK_TOKEN });

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) { }

    logar(username: string, password: string, ip: string) {

        return this.http.post<Login>(MK_API + '/api/Authentication/logar', { login: username, password: password, ip: ip }, { headers: headers })
            .map(data => {
                // login successful if there's a jwt token in the response
                if (data) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', data.id);
                }
                return data;
            });
    }


}
