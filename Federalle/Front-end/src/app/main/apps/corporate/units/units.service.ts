import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { MK_API } from "app/app.api";
import { MK_TOKEN } from "app/app.token";
import { Unity } from '../unity/unity.model';
import { FuseUtils } from "@fuse/utils";

const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});

@Injectable()
export class UnitsService implements Resolve<any>
{
    units: any[];
    searchText: string;
    onUnitsChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onUnitsChanged = new BehaviorSubject({});
        this.onSearchTextChanged = new Subject();
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getUnitys()
            ]).then(
                ([files]) => {
                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getUnitys();
                    });
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get Units
     *
     * @returns {Promise<any>}
     */
    getUnitys(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(MK_API + "/api/Unities/", { headers: headers })
                .subscribe((response: any) => {
                    this.units = response;

                    if (this.searchText && this.searchText !== "") {
                        this.units = FuseUtils.filterArrayByString(
                            this.units,
                            this.searchText
                        );
                    }
                    this.units = this.units.map(item => {
                        return new Unity(item);
                    });

                    this.onUnitsChanged.next(this.units);
                    resolve(response);
                }, reject);
        });
    }

     /**
     * delete Unity
     *
     * @param unity
     * @returns {Promise<any>}
     */
    deleteUnity(unity): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .delete(MK_API + "/api/Unities/" + unity.id, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this.getUnitys()
                    resolve(response);
                }, reject);
        });
    }
}
