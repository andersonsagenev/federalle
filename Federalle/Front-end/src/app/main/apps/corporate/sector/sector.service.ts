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
import { Sector } from "app/main/apps/corporate/sector/sector.model";
import { FuseUtils } from "@fuse/utils";
import { ConfirmService } from "@fuse/services/confirm.service";

const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});

@Injectable()
export class SectorService implements Resolve<any> {
    onChanged: BehaviorSubject<any>;
    onSectorChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;

    searchText: string;
    routeParams: any;
    sectors: Sector[];

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
        this.onSectorChanged = new BehaviorSubject([]);
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
            Promise.all([this.getSector()]).then(([files]) => {
                this.onSearchTextChanged.subscribe(searchText => {
                    this.searchText = searchText;
                    this.getSector();
                });
                resolve();
            }, reject);
        });
    }

    /**
     * Get sector
     *
     * @returns {Promise<any>}
     */
    getSector(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/Sectors/", { headers: headers })
                .subscribe((response: any) => {
                    this.sectors = response;
                    if (this.searchText && this.searchText !== "") {
                        this.sectors = FuseUtils.filterArrayByString(
                            this.sectors,
                            this.searchText
                        );
                    }
                    this.sectors = this.sectors.map(contact => {
                        return new Sector(contact);
                    });

                    this.onSectorChanged.next(this.sectors);
                    resolve(this.sectors);
                }, reject);
        });
    }

    /**
     * Save Sector
     *
     * @param sector
     * @returns {Promise<any>}
     */
    updateSector(item): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .put(MK_API + "/api/Sectors/" + item.id, item, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalUpdate()
                    this.getSector();
                    resolve(response);
                }, reject);
        });
    }

    /**
     * delete sector
     *
     * @param sector
     * @returns {Promise<any>}
     */
    deleteSector(item): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .delete(MK_API + "/api/Sectors/" + item.id, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this.getSector()
                    resolve(response);
                }, reject);
        });
        

       
    }

    /**
     * Add Sector
     *
     * @param sector
     * @returns {Promise<any>}
     */
    addSector(sector): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(MK_API + "/api/Sectors/", sector, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalInsert()
                    this.getSector();
                    resolve(response);
                }, reject);
        });
    }
}
