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
import { Benefits } from "app/main/apps/corporate/benefits/benefits.model";
import { Consorcio } from "app/main/apps/corporate/consorcio/consorcio.model";
import { FuseUtils } from "@fuse/utils";
import { ConfirmService } from "@fuse/services/confirm.service";

const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});

@Injectable()
export class ReceiptCommissionService implements Resolve<any> {
    onConsorcioChanged: BehaviorSubject<any>;
    onBenefitsChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;

    searchText: string;
    routeParams: any;
    beneficios: Benefits[];
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
        this.onConsorcioChanged = new BehaviorSubject({});
        this.onBenefitsChanged = new BehaviorSubject([]);
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
                this.getBenefits(),
                this.getConsorcios()
            ]).then(([files]) => {
                this.onSearchTextChanged.subscribe(searchText => {
                    this.searchText = searchText;
                    this.getBenefits()
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
                    this.consorcios = this.consorcios.map(plan => {
                        return new Consorcio(plan);
                    });
                    this.onConsorcioChanged.next(this.consorcios);
                    resolve(this.consorcios);
                }, reject);
        });
    }
    /**
     * Get Benefits
     *
     * @returns {Promise<any>}
     */
    getBenefits(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/benefits/", { headers: headers })
                .subscribe((response: any) => {
                    this.beneficios = response;
                    console.log('Beneficios ~~~~>', this.beneficios)
                    if (this.searchText && this.searchText !== "") {
                        this.beneficios = FuseUtils.filterArrayByString(
                            this.beneficios,
                            this.searchText
                        );
                    }
                    this.beneficios = this.beneficios.map(item => {
                        return new Benefits(item);
                    });

                    this.onBenefitsChanged.next(this.beneficios);
                    resolve(this.beneficios);
                }, reject);
        });
    }

    /**
     * Save Plans
     *
     * @param bem
     * @returns {Promise<any>}
     */
    updateBenefits(bem): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .put(MK_API + "/api/benefits/" + bem.id, bem, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this.getBenefits();
                    this._alert.SwalUpdate()
                    resolve(response);
                }, reject);
        });
    }

    /**
     * delete bem
     *
     * @param bem
     * @returns {Promise<any>}
     */
    deleteBenefits(bem): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .delete(MK_API + "/api/benefits/" + bem.id, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this.getBenefits()
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add Bem
     *
     * @param bem
     * @returns {Promise<any>}
     */
    addBenefits(bem): Promise<any> {
        console.log('parametros bem ~~>', bem)
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(MK_API + "/api/benefits", bem, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalInsert()
                    this.getBenefits();
                    resolve(response);
                }, reject);
        });
    }
}
