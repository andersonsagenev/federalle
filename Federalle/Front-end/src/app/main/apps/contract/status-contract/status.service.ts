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
import { Status } from "app/main/apps/contract/status-contract/status.model";
import { FuseUtils } from "@fuse/utils";
import { ConfirmService } from "@fuse/services/confirm.service";

const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});

@Injectable()
export class StatusService implements Resolve<any> {
    onChanged: BehaviorSubject<any>;
    onStatusChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;

    searchText: string;
    routeParams: any;
    status: Status[];

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
        this.onStatusChanged = new BehaviorSubject([]);
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
            Promise.all([this.getStatus()]).then(([files]) => {
                this.onSearchTextChanged.subscribe(searchText => {
                    this.searchText = searchText;
                    this.getStatus();
                });
                resolve();
            }, reject);
        });
    }

    /**
     * Get consorcios
     *
     * @returns {Promise<any>}
     */
    getStatus(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/statusContracts/", { headers: headers })
                .subscribe((response: any) => {
                    this.status = response;
                    if (this.searchText && this.searchText !== "") {
                        this.status = FuseUtils.filterArrayByString(
                            this.status,
                            this.searchText
                        );
                    }
                    this.status = this.status.map(item => {
                        return new Status(item);
                    });

                    this.onStatusChanged.next(this.status);
                    resolve(this.status);
                }, reject);
        });
    }

    /**
     * Save Consorcio
     *
     * @param consorcio
     * @returns {Promise<any>}
     */
    updateStatus(item): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .put(MK_API + "/api/statusContracts/" + item.id, item, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalUpdate()
                    this.getStatus();
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
    deleteStatus(item): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .delete(MK_API + "/api/statusContracts/" + item.id, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this.getStatus()
                    resolve(response);
                }, reject);
        });
        

       
    }

    /**
     * Add Status Contract
     *
     * @param status
     * @returns {Promise<any>}
     */
    addStatus(status): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(MK_API + "/api/statusContracts/", status, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalInsert()
                    this.getStatus();
                    resolve(response);
                }, reject);
        });
    }
}
