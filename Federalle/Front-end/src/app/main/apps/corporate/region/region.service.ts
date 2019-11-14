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
import { Region } from "app/main/apps/corporate/region/region.model";
import { FuseUtils } from "@fuse/utils";
import { ConfirmService } from "@fuse/services/confirm.service";

const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});

@Injectable()
export class RegionService implements Resolve<any> {
    onConsorcioChanged: BehaviorSubject<any>;
    onRegiosChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;

    searchText: string;
    routeParams: any;
    consorcios: Consorcio[];
    regions: Region[];

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
        this.onConsorcioChanged = new BehaviorSubject({});
        this.onRegiosChanged = new BehaviorSubject([]);
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
            Promise.all([
                this.getConsorcios(),
                this.getRegion()
            ]).then(([files]) => {
                this.onSearchTextChanged.subscribe(searchText => {
                    this.searchText = searchText;
                    this.getRegion()
                });
                resolve();
            }, reject);
        });
    }

     /**
     * Get Consorcios
     *
     * @returns {Promise<any>}
     */
    getConsorcios(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/consortia/", { headers: headers })
                .subscribe((response: any) => {
                    this.consorcios = response;
                   console.log('retorno consorcios', response)
                    this.consorcios = this.consorcios.map(contact => {
                        return new Consorcio(contact);
                    });
                    this.onConsorcioChanged.next(this.consorcios);
                    resolve(this.consorcios);
                }, reject);
        });
    }
    /**
     * Get Region
     *
     * @returns {Promise<any>}
     */
    getRegion(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/Verifications/", { headers: headers })
                .subscribe((response: any) => {
                    this.regions = response;
                    console.log('Regioes ~~~~>', this.regions)
                    if (this.searchText && this.searchText !== "") {
                        this.regions = FuseUtils.filterArrayByString(
                            this.regions,
                            this.searchText
                        );
                    }
                    this.regions = this.regions.map(item => {
                        return new Region(item);
                    });

                    this.onRegiosChanged.next(this.regions);
                    resolve(this.regions);
                }, reject);
        });
    }

    /**
     * Save Code Region
     *
     * @param code
     * @returns {Promise<any>}
     */
    updateRegion(code): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .put(MK_API + "/api/Verifications/" + code.id, code, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalUpdate()
                    this.getRegion();
                    resolve(response);
                }, reject);
        });
    }

    /**
     * delete Region
     *
     * @param code
     * @returns {Promise<any>}
     */
    deleteRegion(code): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .delete(MK_API + "/api/Verifications/" + code.id, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this.getRegion()
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add Code Regio
     *
     * @param code
     * @returns {Promise<any>}
     */
    addRegion(code): Promise<any> {
        console.log('parametros region ~~>', code)
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(MK_API + "/api/Verifications", code, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalInsert()
                    this.getRegion();
                    resolve(response);
                }, reject);
        });
    }
}
