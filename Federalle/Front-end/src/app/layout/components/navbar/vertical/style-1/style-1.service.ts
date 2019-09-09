import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MK_API } from '../../../../../app.api';
import { MK_TOKEN } from 'app/app.token';
import { User } from 'app/models/user';

const headers = new HttpHeaders({ 'Authorization': 'Basic ' + localStorage.getItem('user'), 'x-api-key': MK_TOKEN });

@Injectable()
export class StyleService 
{
  
   

    /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
    constructor(
        private _httpClient: HttpClient,
        private _router: Router,
    ) {
       
    }
 
    getUser():Observable<User> {
        return this._httpClient.get<User>(MK_API + '/api/users/' + localStorage.getItem("user"), { headers: headers }) 
            .map(data => {
                return data;
            });
    }
}
