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
import { StatusContract } from "app/main/apps/contract/status-representative/status-representative.model";
import { FuseUtils } from "@fuse/utils";
import { ConfirmService } from "@fuse/services/confirm.service";

const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});

@Injectable()
export class StatusContractService implements Resolve<any> {
    onChanged: BehaviorSubject<any>;
    onStatusContractChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;

    searchText: string;
    routeParams: any;
    status: StatusContract[];

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
        this.onStatusContractChanged = new BehaviorSubject([]);
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
            Promise.all([this.getStatusContract()]).then(([files]) => {
                this.onSearchTextChanged.subscribe(searchText => {
                    this.searchText = searchText;
                    this.getStatusContract();
                });
                resolve();
            }, reject);
        });
    }

    /**
     * Get status representative
     *
     * @returns {Promise<any>}
     */
    getStatusContract(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/statusPartnershipContracts/", { headers: headers })
                .subscribe((response: any) => {
                    this.status = response;
                    if (this.searchText && this.searchText !== "") {
                        this.status = FuseUtils.filterArrayByString(
                            this.status,
                            this.searchText
                        );
                    }
                    this.status = this.status.map(item => {
                        return new StatusContract(item);
                    });

                    this.onStatusContractChanged.next(this.status);
                    resolve(this.status);
                }, reject);
        });
    }

    /**
     * Save Status Representante
     *
     * @param status
     * @returns {Promise<any>}
     */
    updateStatusContract(status): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .put(MK_API + "/api/statusPartnershipContracts/" + status.id, status, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalUpdate()
                    this.getStatusContract();
                    resolve(response);
                }, reject);
        });
    }

    /**
     * delete status contract
     *
     * @param status
     * @returns {Promise<any>}
     */
    deleteStatusContract(status): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .delete(MK_API + "/api/statusPartnershipContracts/" + status.id, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this.getStatusContract()
                    resolve(response);
                }, reject);
        });
        

       
    }

    /**
     * Add Status Representante
     *
     * @param status
     * @returns {Promise<any>}
     */
    addStatusContract(status): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(MK_API + "/api/statusPartnershipContracts/", status, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalInsert()
                    this.getStatusContract();
                    resolve(response);
                }, reject);
        });
    }
}
