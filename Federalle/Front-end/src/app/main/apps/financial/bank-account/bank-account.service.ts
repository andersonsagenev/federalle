import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FuseUtils } from '@fuse/utils';
import { BankAccount } from 'app/main/apps/financial/bank-account/bank-account.model';
import { MK_API } from '../../../../app.api';
import { MK_TOKEN } from 'app/app.token';
import { ConfirmService } from "@fuse/services/confirm.service";
import { Unity } from '../../../../models/unity';

const headers = new HttpHeaders({ 'Authorization': 'Basic ' + localStorage.getItem('user'), 'x-api-key': MK_TOKEN });

@Injectable()
export class BankAccountService implements Resolve<any>
{
    onBankAccountChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onUnitiesChanged: BehaviorSubject<any>;

    onUserDataChanged: BehaviorSubject<any>;
    onFilterChanged: Subject<any>;
    onChanged: BehaviorSubject<any>;
    unities: Unity[];
    bankAccount: BankAccount[];
    user: any;
    commissions: any;
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
        this.onBankAccountChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();

        this.onUnitiesChanged = new BehaviorSubject([]);
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
                this.getGridCommission(),
                this.getUnities(),
               
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getGridCommission();
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
     * Get Grid Commission
     *
     * @returns {Promise<any>}
     */
    getGridCommission(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(MK_API + '/api/CommissionPaymentValues/', { headers: headers })
            .subscribe((response: any) => {
                console.log('grids ~~~>', response)
                this.commissions = response
                if (this.searchText && this.searchText !== "") {
                    this.commissions = FuseUtils.filterArrayByString(
                        this.commissions,
                        this.searchText
                    );
                }
                this.commissions = this.commissions.map(item => {
                    return new BankAccount(item);
                });
                this.onBankAccountChanged.next(this.commissions);
                resolve(this.commissions);
            }, reject);
        });
    }
    
    /**
    * Get Unidades
    *
    * @returns {Promise<any>}
    */
   getUnities(): Promise<any> {
       return new Promise((resolve, reject) => {
           this._httpClient
               .get(MK_API + '/api/Unities/', { headers: headers })
               .subscribe((response: any) => {
                   this.unities = response;
                  console.log('retorno unities', response)
                   this.unities = this.unities.map(item => {
                       return new Unity(item);
                   });
                   this.onUnitiesChanged.next(this.unities);
                   resolve(this.unities);
               }, reject);
       });
   }

     /**
     * Save Commissions
     *
     * @param grid
     * @returns {Promise<any>}
     */
    updateGridCommission(grid): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .put(MK_API + "/api/CommissionPaymentValues/" + grid.id, grid, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalUpdate()
                    this.getGridCommission();
                    resolve(response);
                }, reject);
        });
    }

    /**
     * delete grid commission
     *
     * @param grid
     * @returns {Promise<any>}
     */
    deleteGridCommission(grid): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .delete(MK_API + "/api/CommissionPaymentValues/" + grid.id, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this.getGridCommission()
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add Grid Commission
     *
     * @param grid
     * @returns {Promise<any>}
     */
    addGridCommission(grid): Promise<any> {
        console.log('parametros grid ~~>', grid)
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(MK_API + "/api/CommissionPaymentValues", grid, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalInsert()
                    this.getGridCommission();
                    resolve(response);
                }, reject);
        });
    }

  
   

}
