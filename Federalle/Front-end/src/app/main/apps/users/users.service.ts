import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RequestService } from '@fuse/services/request.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FuseUtils } from '@fuse/utils';
import { User } from 'app/main/apps/users/users.model';
import { MK_API } from '../../../app.api';
import { MK_TOKEN } from 'app/app.token';
import { ConfirmService } from "@fuse/services/confirm.service";

const headers = new HttpHeaders({ 'Authorization': 'Basic ' + localStorage.getItem('user'), 'x-api-key': MK_TOKEN });

@Injectable()
export class UserService implements Resolve<any>
{
    onUsersChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;

    onSelectedStudentsChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onFilterChanged: Subject<any>;
    onChanged: BehaviorSubject<any>;

    students: User[];
    user: any;
    users: any;
    person: any;
    selectedStudents: string[] = [];
    searchText: string;
    filterBy: string;
    routeParams: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private _alert: ConfirmService
    ) {
        // Set the defaults
        this.onUsersChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();

        this.onSelectedStudentsChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onFilterChanged = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getUsers(),
               
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getUsers();
                    });

                    // this.onFilterChanged.subscribe(filter => {
                    //     this.filterBy = filter;
                    //     this.getContacts();
                    // });

                    resolve();
                },
                reject
            );
        });
    }

     /**
     * Get users
     *
     * @returns {Promise<any>}
     */
    getUsers(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(MK_API + '/api/users/', { headers: headers })
            .subscribe((response: any) => {
                console.log('usuarios ~~~>', response)
                this.users = response
                if (this.searchText && this.searchText !== "") {
                    this.users = FuseUtils.filterArrayByString(
                        this.users,
                        this.searchText
                    );
                }
                this.users = this.users.map(item => {
                    return new User(item);
                });
                this.onUsersChanged.next(this.users);
                resolve(this.users);
            }, reject);
        });
    }

      /**
     * Update User
     *
     * @param user
     * @returns {Promise<any>}
     */
    UserUpdate(user): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .put(MK_API + "/api/users/" + user.id, user, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalUpdate()
                    this.getUsers();
                    resolve(response);
                }, reject);
        });
    }
  

    /**
     * Toggle select all
     */
    toggleSelectAll(): void {
        if (this.selectedStudents.length > 0) {
            this.deselectContacts();
        }
        else {
            this.selectContacts();
        }
    }

    /**
     * Select students
     *
     * @param filterParameter
     * @param filterValue
     */
    selectContacts(filterParameter?, filterValue?): void {
        this.selectedStudents = [];

        // If there is no filter, select all contacts
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedStudents = [];
            this.students.map(item => {
                this.selectedStudents.push(item.id);
            });
        }

        // Trigger the next event
        this.onSelectedStudentsChanged.next(this.selectedStudents);
    }

  

    /**
     * Update user data
     *
     * @param userData
     * @returns {Promise<any>}
     */
    updateUserData(userData): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/contacts-user/' + this.user.id, { ...userData })
                .subscribe(response => {
                  //  this.getContacts();
                    resolve(response);
                });
        });
    }

    /**
     * Deselect contacts
     */
    deselectContacts(): void {
        this.selectedStudents = [];

        // Trigger the next event
        this.onSelectedStudentsChanged.next(this.selectedStudents);
    }

    /**
     * Delete contact
     *
     * @param contact
     */
    deleteContact(contact): void {
        const contactIndex = this.students.indexOf(contact);
        this.students.splice(contactIndex, 1);
        this.onUsersChanged.next(this.students);
    }

    /**
     * Delete selected contacts
     */
    deleteSelectedStudents(): void {
        for (const contactId of this.selectedStudents) {
            const contact = this.students.find(_contact => {
                return _contact.id === contactId;
            });
            const contactIndex = this.students.indexOf(contact);
            this.students.splice(contactIndex, 1);
        }
        this.onUsersChanged.next(this.students);
        this.deselectContacts();
    }

    // updateStudent(student: any) {
    //     let requestData: any = {}
    //     requestData = student;
    //     requestData.name = student.firstName + ' ' + student.lastName

    //     if (requestData.password) {
    //         delete requestData.password;
    //     }
    //     if (requestData.passwordConfirm) {
    //         delete requestData.passwordConfirm;
    //     }
    //     if (requestData.role) {
    //         delete requestData.role;
    //     }
    //     console.log('form update ==>', requestData)

    //     this._request.server('/api/user/' + student.id, 'put', requestData).subscribe(data => {
    //         console.log('retorno data', data)
    //         if (data.success == true) {
           
    //             this._alert.SwalUpdate()
    //         } else {
    //             this._alert.SwalError()

    //         }
    //     }, error => {
    //         console.log('Error', error)
    //     })

    // }

}
