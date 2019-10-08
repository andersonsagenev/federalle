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
import { ReceiptCommission } from "app/main/apps/financial/receipt-commission/receipt-commission.model";
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
    onReceiptCommissionChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;

    searchText: string;
    routeParams: any;
    receiptCommission: ReceiptCommission[];
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
        this.onReceiptCommissionChanged = new BehaviorSubject([]);
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
                this.getReceiptCommission(),
                this.getConsorcios()
            ]).then(([files]) => {
                this.onSearchTextChanged.subscribe(searchText => {
                    this.searchText = searchText;
                    this.getReceiptCommission()
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
     * Get Receipt Commission
     *
     * @returns {Promise<any>}
     */
    getReceiptCommission(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/CommissionReceipts/", { headers: headers })
                .subscribe((response: any) => {
                    this.receiptCommission = response;
                    console.log('comissao recebimento ~~~~>', this.receiptCommission)
                    if (this.searchText && this.searchText !== "") {
                        this.receiptCommission = FuseUtils.filterArrayByString(
                            this.receiptCommission,
                            this.searchText
                        );
                    }
                    this.receiptCommission = this.receiptCommission.map(item => {
                        return new ReceiptCommission(item);
                    });

                    this.onReceiptCommissionChanged.next(this.receiptCommission);
                    resolve(this.receiptCommission);
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
                    this.getReceiptCommission();
                    this._alert.SwalUpdate()
                    resolve(response);
                }, reject);
        });
    }

    /**
     * delete Receipt Commission
     *
     * @param receipt
     * @returns {Promise<any>}
     */
    deleteReceiptCommission(receipt): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .delete(MK_API + "/api/CommissionReceipts/" + receipt.id, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this.getReceiptCommission()
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add Receipt commission
     *
     * @param receipt
     * @returns {Promise<any>}
     */
    addReceiptCommission(receipt): Promise<any> {
        console.log('parametros receipt ~~>', receipt)
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(MK_API + "/api/CommissionReceipts", receipt, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalInsert()
                    this.getReceiptCommission();
                    resolve(response);
                }, reject);
        });
    }
}
