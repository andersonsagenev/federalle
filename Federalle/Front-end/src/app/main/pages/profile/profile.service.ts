import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { MK_API } from '../../../app.api';
import { MK_TOKEN } from 'app/app.token';
import { User } from 'app/models/user';

const headers = new HttpHeaders({ 'Authorization': 'Basic ' + localStorage.getItem('user'), 'x-api-key': MK_TOKEN });

@Injectable()
export class ProfileService implements Resolve<any>
{
    selectedUsers: string[] = [];
    users: User[];
    profile: User; 

    
    about: any;
    user: any;
    userEmail: any;
 
    userOnChanged: BehaviorSubject<any>;
    onChangedProfile: BehaviorSubject<any>;
    onSelectedUsersChanged: BehaviorSubject<any>;
    itens: any[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        this.onSelectedUsersChanged = new BehaviorSubject({});
        this.userOnChanged = new BehaviorSubject({});
        this.onChangedProfile = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getUser(),
            //    this.getUserEmail(),
              //  this.getProfiles(),
                //this.getItens(),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }


    /**
     * Get User
     */
    getUser(): Promise<any[]> {
        return new Promise((resolve, reject) => {

            this._httpClient.get(MK_API + '/api/users/' + localStorage.getItem("user"), { headers: headers })
                .subscribe((_user: any) => {
                    this.user = _user;
                    this.userOnChanged.next(this.user);
                    resolve(this.user);
                }, reject);
        });
    }

    // getUserEmail(): Promise<any[]> {
    //     return new Promise((resolve, reject) => {

    //         this._httpClient.get(MK_API + 'api/useremails/' + localStorage.getItem("idUser"), { headers: headers })
    //             .subscribe((response: any) => {
    //                 this.userEmail = response;
    //                 this.userEmailOnChanged.next(this.userEmail);
    //                 resolve(response);
    //             }, reject);
    //     });
    // }
    getProfiles() {
        return new Promise((resolve, reject) => {
            this._httpClient.get(MK_API + 'api/auxiliar/GetUser/', { headers: headers })
                .subscribe((response: any) => {
                    this.users = response;
                    this.onChangedProfile.next(this.users);
                    resolve(response);
                });
        });
    }
    selectPersons(filterParameter?, filterValue?): void {
        this.selectedUsers = [];
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedUsers = [];
            this.users.map(user => {
                this.selectedUsers.push(user.id);
            });
        }
        this.onSelectedUsersChanged.next(this.selectedUsers);
    }

    /**
    * Save product
    *
    * @param user
    * @returns {Promise<any>}
    */
    createuser(user): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(MK_API + 'api/users/', user, { headers: headers })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    deluser(user): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.delete(MK_API + 'api/users/' + user.id, { headers: headers })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    saveuser(user): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(MK_API + 'api/users/' + user.id, user, { headers: headers })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    saveEmailUser(useremail): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(MK_API + 'api/UserEmails/' + useremail.id, useremail, { headers: headers })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    addEmailUser(useremail): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(MK_API + 'api/UserEmails/', useremail, { headers: headers })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    saveuserPhoto(id, user): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(MK_API + 'api/auxiliar/PutUserPhoto/' + id, user, { headers: headers })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    savespacePhoto(id, space): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(MK_API + 'api/auxiliar/PutSpacePhoto/' + id, space, { headers: headers })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    saveuseremail(useremail): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(MK_API + 'api/useremails/' + useremail.id, useremail, { headers: headers })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    savespace(space): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(MK_API + 'api/spaces/' + space.id, space, { headers: headers })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    } 
    newPassword(id: string, password: string) {
        return this._httpClient.post<User>(MK_API + '/api/Authentication/newpassword', { id: id, newPassword: password }, { headers: headers })
            .map(data => {
                return data;
            });
    }
   
}
