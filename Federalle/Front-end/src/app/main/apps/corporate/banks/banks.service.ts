import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { MK_API } from "app/app.api";
import { MK_TOKEN } from "app/app.token";
import { Banks } from "app/main/apps/corporate/banks/banks.model";
import { FuseUtils } from "@fuse/utils";
import { ConfirmService } from "@fuse/services/confirm.service";

const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});

@Injectable()
export class BanksService implements Resolve<any> {
    onChanged: BehaviorSubject<any>;
    onBankChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;

    searchText: string;
    routeParams: any;
    banks: Banks[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private _alert: ConfirmService)
    {
        // Set the defaults
        this.onChanged = new BehaviorSubject({});
        this.onBankChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {
            Promise.all([this.getBanks()]).then(([files]) => {
                this.onSearchTextChanged.subscribe(searchText => {
                    this.searchText = searchText;
                    this.getBanks();
                });
                resolve();
            }, reject);
        });
    }

    /**
     * Get banks
     *
     * @returns {Promise<any>}
     */
    getBanks(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/banks/", { headers: headers })
                .subscribe((response: any) => {
                    this.banks = response;
                    console.log('bancos ~~~>', response)
                    if (this.searchText && this.searchText !== "") {
                        this.banks = FuseUtils.filterArrayByString(
                            this.banks,
                            this.searchText
                        );
                    }
                    this.banks = this.banks.map(item => {
                        return new Banks(item);
                    });

                    this.onBankChanged.next(this.banks);
                    resolve(this.banks);
                }, reject);
        });
    }

    /**
     * Save Consorcio
     *
     * @param consorcio
     * @returns {Promise<any>}
     */
    updateBank(item): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .put(MK_API + "/api/banks/" + item.id, item, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalUpdate()
                    this.getBanks();
                    resolve(response);
                }, reject);
        });
    }

    /**
     * delete consorcio
     *
     * @param consorcio
     * @returns {Promise<any>}
     */
    deleteBank(item): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .delete(MK_API + "/api/banks/" + item.id, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this.getBanks()
                    resolve(response);
                }, reject);
        });
        

       
    }

    /**
     * Add Consorcio
     *
     * @param consorcio
     * @returns {Promise<any>}
     */
    addConsorcio(consorcio): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(MK_API + "/api/banks/", consorcio, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalInsert()
                    this.getBanks();
                    resolve(response);
                }, reject);
        });
    }
}
