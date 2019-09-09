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
import { Verification } from "app/main/apps/corporate/verification/verification.model";
import { FuseUtils } from "@fuse/utils";
import { ConfirmService } from "@fuse/services/confirm.service";

const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});

@Injectable()
export class VerificationService implements Resolve<any> {
    onSectorChanged: BehaviorSubject<any>;
    onVerificationChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;

    searchText: string;
    routeParams: any;
    sectors: Sector[];
    verifications: Verification[];

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
        this.onSectorChanged = new BehaviorSubject({});
        this.onVerificationChanged = new BehaviorSubject([]);
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
                this.getSector(),
                this.getVerification()
            ]).then(([files]) => {
                this.onSearchTextChanged.subscribe(searchText => {
                    this.searchText = searchText;
                    this.getVerification()
                });
                resolve();
            }, reject);
        });
    }

    /**
     * Get Sectors
     *
     * @returns {Promise<any>}
     */
    getSector(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/Sectors/", { headers: headers })
                .subscribe((response: any) => {
                    this.sectors = response;
                   console.log('retorno sectors', response)
                    this.sectors = this.sectors.map(sector => {
                        return new Sector(sector);
                    });
                    this.onSectorChanged.next(this.sectors);
                    resolve(this.sectors);
                }, reject);
        });
    }
    /**
     * Get Verifications
     *
     * @returns {Promise<any>}
     */
    getVerification(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/Verifications/", { headers: headers })
                .subscribe((response: any) => {
                    this.verifications = response;
                    console.log('Verificacao ~~~~>', this.verifications)
                    if (this.searchText && this.searchText !== "") {
                        this.verifications = FuseUtils.filterArrayByString(
                            this.verifications,
                            this.searchText
                        );
                    }
                    this.verifications = this.verifications.map(item => {
                        return new Verification(item);
                    });

                    this.onVerificationChanged.next(this.verifications);
                    resolve(this.verifications);
                }, reject);
        });
    }

    /**
     * Save Verifications
     *
     * @param verification
     * @returns {Promise<any>}
     */
    updateVerification(verification): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .put(MK_API + "/api/Verifications/" + verification.id, verification, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalUpdate()
                    this.getVerification();
                    resolve(response);
                }, reject);
        });
    }

    /**
     * delete Verification
     *
     * @param verification
     * @returns {Promise<any>}
     */
    deleteVerification(verification): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .delete(MK_API + "/api/Verifications/" + verification.id, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this.getVerification()
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add verifications
     *
     * @param verification
     * @returns {Promise<any>}
     */
    addVerification(verification): Promise<any> {
        console.log('parametros verification ~~>', verification)
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(MK_API + "/api/Verifications", verification, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalInsert()
                    this.getVerification();
                    resolve(response);
                }, reject);
        });
    }
}
