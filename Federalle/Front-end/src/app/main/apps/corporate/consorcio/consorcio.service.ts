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
import { Consorcio } from "app/main/apps/corporate/consorcio/consorcio.model";
import { FuseUtils } from "@fuse/utils";
import { ConfirmService } from "@fuse/services/confirm.service";

const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});

@Injectable()
export class ConsorcioService implements Resolve<any> {
    onChanged: BehaviorSubject<any>;
    onConsorcioChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;

    searchText: string;
    routeParams: any;
    consorcios: Consorcio[];

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
        this.onConsorcioChanged = new BehaviorSubject([]);
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
            Promise.all([this.getConsorcio()]).then(([files]) => {
                this.onSearchTextChanged.subscribe(searchText => {
                    this.searchText = searchText;
                    this.getConsorcio();
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
    getConsorcio(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/consortia/", { headers: headers })
                .subscribe((response: any) => {
                    this.consorcios = response;
                    if (this.searchText && this.searchText !== "") {
                        this.consorcios = FuseUtils.filterArrayByString(
                            this.consorcios,
                            this.searchText
                        );
                    }
                    this.consorcios = this.consorcios.map(contact => {
                        return new Consorcio(contact);
                    });

                    this.onConsorcioChanged.next(this.consorcios);
                    resolve(this.consorcios);
                }, reject);
        });
    }

    /**
     * Save Consorcio
     *
     * @param consorcio
     * @returns {Promise<any>}
     */
    updateConsorcio(item): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .put(MK_API + "/api/consortia/" + item.id, item, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalUpdate()
                    this.getConsorcio();
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
    deleteConsorcio(item): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .delete(MK_API + "/api/consortia/" + item.id, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this.getConsorcio()
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
                .post(MK_API + "/api/consortia/", consorcio, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalInsert()
                    this.getConsorcio();
                    resolve(response);
                }, reject);
        });
    }
}
