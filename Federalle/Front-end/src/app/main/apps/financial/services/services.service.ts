import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { MK_API } from "app/app.api";
import { MK_TOKEN } from "app/app.token";
import { Services } from "app/main/apps/financial/services/services.model";
import { FuseUtils } from "@fuse/utils";
import { ConfirmService } from "@fuse/services/confirm.service";

const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});

@Injectable()
export class ServicesService implements Resolve<any> {
    onChanged: BehaviorSubject<any>;
    onServicesChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;

    searchText: string;
    routeParams: any;
    services: Services[];

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
        this.onServicesChanged = new BehaviorSubject([]);
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
            Promise.all([this.getServices()]).then(([files]) => {
                this.onSearchTextChanged.subscribe(searchText => {
                    this.searchText = searchText;
                    this.getServices();
                });
                resolve();
            }, reject);
        });
    }

    /**
     * Get Services
     *
     * @returns {Promise<any>}
     */
    getServices(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/****/", { headers: headers })
                .subscribe((response: any) => {
                    this.services = response;
                    console.log('Retorno de servicos', response)
                    if (this.searchText && this.searchText !== "") {
                        this.services = FuseUtils.filterArrayByString(
                            this.services,
                            this.searchText
                        );
                    }
                    if(this.services){
                    this.services = this.services.map(item => {
                        return new Services(item);
                    });
                }

                    this.onServicesChanged.next(this.services);
                    resolve(this.services);
                }, reject);
        });
    }

    /**
     * Save Service
     *
     * @param item
     * @returns {Promise<any>}
     */
    updateServices(item): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .put(MK_API + "/api/***/" + item.id, item, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalUpdate()
                    this.getServices();
                    resolve(response);
                }, reject);
        });
    }

    /**
     * delete Service
     *
     * @param item
     * @returns {Promise<any>}
     */
    deleteServices(item): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .delete(MK_API + "/api/****/" + item.id, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this.getServices()
                    resolve(response);
                }, reject);
        });
        

       
    }

    /**
     * Add Service
     *
     * @param item
     * @returns {Promise<any>}
     */
    addServices(item): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(MK_API + "/api/****/", item, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalInsert()
                    this.getServices();
                    resolve(response);
                }, reject);
        });
    }
}
