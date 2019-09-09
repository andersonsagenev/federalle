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
import { Plano } from "app/main/apps/corporate/plano/plano.model";
import { FuseUtils } from "@fuse/utils";
import { ConfirmService } from "@fuse/services/confirm.service";

const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});

@Injectable()
export class PlanoService implements Resolve<any> {
    onConsorcioChanged: BehaviorSubject<any>;
    onPlanoChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;

    searchText: string;
    routeParams: any;
    consorcios: Consorcio[];
    plans: Plano[];

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
        this.onPlanoChanged = new BehaviorSubject([]);
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
                this.getPlanos()
            ]).then(([files]) => {
                this.onSearchTextChanged.subscribe(searchText => {
                    this.searchText = searchText;
                    this.getPlanos()
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
     * Get Planos
     *
     * @returns {Promise<any>}
     */
    getPlanos(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/plans/", { headers: headers })
                .subscribe((response: any) => {
                    this.plans = response;
                    console.log('Planos ~~~~>', this.plans)
                    if (this.searchText && this.searchText !== "") {
                        this.plans = FuseUtils.filterArrayByString(
                            this.plans,
                            this.searchText
                        );
                    }
                    this.plans = this.plans.map(contact => {
                        return new Plano(contact);
                    });

                    this.onPlanoChanged.next(this.plans);
                    resolve(this.plans);
                }, reject);
        });
    }

    /**
     * Save Plans
     *
     * @param plano
     * @returns {Promise<any>}
     */
    updatePlano(plano): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .put(MK_API + "/api/plans/" + plano.id, plano, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalUpdate()
                    this.getPlanos();
                    resolve(response);
                }, reject);
        });
    }

    /**
     * delete plano
     *
     * @param plano
     * @returns {Promise<any>}
     */
    deletePlan(plano): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .delete(MK_API + "/api/Plans/" + plano.id, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this.getPlanos()
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add Plans
     *
     * @param plano
     * @returns {Promise<any>}
     */
    addPlano(plano): Promise<any> {
        console.log('parametros plano ~~>', plano)
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(MK_API + "/api/Plans", plano, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalInsert()
                    this.getPlanos();
                    resolve(response);
                }, reject);
        });
    }
}
