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
import { Number } from "app/main/apps/contract/contract-number/contract-number.model";
import { FuseUtils } from "@fuse/utils";
import { ConfirmService } from "@fuse/services/confirm.service";

const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});

@Injectable()
export class ContractNumberService implements Resolve<any> {
    onConsorcioChanged: BehaviorSubject<any>;
    onContractNumberChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;

    searchText: string;
    routeParams: any;
    consorcios: Consorcio[];
    numbers: Number[];

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
        this.onContractNumberChanged = new BehaviorSubject([]);
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
                this.getNumbers()
            ]).then(([files]) => {
                this.onSearchTextChanged.subscribe(searchText => {
                    this.searchText = searchText;
                    this.getNumbers()
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
     * Get Contract Number
     *
     * @returns {Promise<any>}
     */
    getNumbers(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/NumberContracts/", { headers: headers })
                .subscribe((response: any) => {
                    this.numbers = response;
                    console.log('Numeros de Contratos ~~~~>', this.numbers)
                    if (this.searchText && this.searchText !== "") {
                        this.numbers = FuseUtils.filterArrayByString(
                            this.numbers,
                            this.searchText
                        );
                    }
                    this.numbers = this.numbers.map(number => {
                        return new Number(number);
                    });

                    this.onContractNumberChanged.next(this.numbers);
                    resolve(this.numbers);
                }, reject);
        });
    }

    /**
     * Save numbers
     *
     * @param number
     * @returns {Promise<any>}
     */
    updateContractNumber(number): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .put(MK_API + "/api/NumberContracts/" + number.id, number, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalUpdate()
                    this.getNumbers();
                    resolve(response);
                }, reject);
        });
    }

    /**
     * delete number contract
     *
     * @param number
     * @returns {Promise<any>}
     */
    deleteContractNumber(number): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .delete(MK_API + "/api/NumberContracts/" + number.id, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this.getNumbers()
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add numbers
     *
     * @param number
     * @returns {Promise<any>}
     */
    addContractNumber(number): Promise<any> {
        console.log('parametros numuros ~~>', number)
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(MK_API + "/api/NumberContracts", number, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalInsert()
                    this.getNumbers();
                    resolve(response);
                }, reject);
        });
    }
}
