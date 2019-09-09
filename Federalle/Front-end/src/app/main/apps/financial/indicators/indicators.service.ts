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
import { Indicator } from "app/main/apps/financial/indicators/indicators.model";
import { FuseUtils } from "@fuse/utils";
import { ConfirmService } from "@fuse/services/confirm.service";

const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});

@Injectable()
export class IndicatorService implements Resolve<any> {
    onChanged: BehaviorSubject<any>;
    onIndicatorChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;

    searchText: string;
    routeParams: any;
    indicators: Indicator[];

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
        this.onIndicatorChanged = new BehaviorSubject([]);
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
            Promise.all([this.getIndicators()]).then(([files]) => {
                this.onSearchTextChanged.subscribe(searchText => {
                    this.searchText = searchText;
                    this.getIndicators();
                });
                resolve();
            }, reject);
        });
    }

    /**
     * Get Indicators
     *
     * @returns {Promise<any>}
     */
    getIndicators(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/Indicators/", { headers: headers })
                .subscribe((response: any) => {
                    this.indicators = response;
                    if (this.searchText && this.searchText !== "") {
                        this.indicators = FuseUtils.filterArrayByString(
                            this.indicators,
                            this.searchText
                        );
                    }
                    if(this.indicators){
                    this.indicators = this.indicators.map(item => {
                        return new Indicator(item);
                    });
                }

                    this.onIndicatorChanged.next(this.indicators);
                    resolve(this.indicators);
                }, reject);
        });
    }

    /**
     * Save Indicators
     *
     * @param Indicator
     * @returns {Promise<any>}
     */
    updateIndicators(Indicator): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .put(MK_API + "/api/Indicators/" + Indicator.id, Indicator, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalUpdate()
                    this.getIndicators();
                    resolve(response);
                }, reject);
        });
    }

    /**
     * delete Indicators
     *
     * @param indicator
     * @returns {Promise<any>}
     */
    deleteIndicators(indicator): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .delete(MK_API + "/api/Indicators/" + indicator.id, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this.getIndicators()
                    resolve(response);
                }, reject);
        });
        

       
    }

    /**
     * Add Indicators
     *
     * @param indicator
     * @returns {Promise<any>}
     */
    addIndicators(indicator): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(MK_API + "/api/Indicators/", indicator, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalInsert()
                    this.getIndicators();
                    resolve(response);
                }, reject);
        });
    }
}
