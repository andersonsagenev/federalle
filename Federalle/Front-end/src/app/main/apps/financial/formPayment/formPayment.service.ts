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
import { Payment } from "app/main/apps/financial/formPayment/formPayment.model";
import { FuseUtils } from "@fuse/utils";
import { ConfirmService } from "@fuse/services/confirm.service";

const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});

@Injectable()
export class PaymentService implements Resolve<any> {
    onChanged: BehaviorSubject<any>;
    onPaymentChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;

    searchText: string;
    routeParams: any;
    payments: Payment[];

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
        this.onPaymentChanged = new BehaviorSubject([]);
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
            Promise.all([this.getFormPayment()]).then(([files]) => {
                this.onSearchTextChanged.subscribe(searchText => {
                    this.searchText = searchText;
                    this.getFormPayment();
                });
                resolve();
            }, reject);
        });
    }

    /**
     * Get Forma Pagamento
     *
     * @returns {Promise<any>}
     */
    getFormPayment(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/formPayments/", { headers: headers })
                .subscribe((response: any) => {
                    this.payments = response;
                    if (this.searchText && this.searchText !== "") {
                        this.payments = FuseUtils.filterArrayByString(
                            this.payments,
                            this.searchText
                        );
                    }
                    if(this.payments){
                    this.payments = this.payments.map(item => {
                        return new Payment(item);
                    });
                }

                    this.onPaymentChanged.next(this.payments);
                    resolve(this.payments);
                }, reject);
        });
    }

    /**
     * Save Forma Pagamento
     *
     * @param payment
     * @returns {Promise<any>}
     */
    updateFormPayment(payment): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .put(MK_API + "/api/formPayments/" + payment.id, payment, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalUpdate()
                    this.getFormPayment();
                    resolve(response);
                }, reject);
        });
    }

    /**
     * delete forma pagamento
     *
     * @param payment
     * @returns {Promise<any>}
     */
    deletePayment(payment): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .delete(MK_API + "/api/formPayments/" + payment.id, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this.getFormPayment()
                    resolve(response);
                }, reject);
        });
        

       
    }

    /**
     * Add Forma Pagamento
     *
     * @param payment
     * @returns {Promise<any>}
     */
    addFormPayment(payment): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(MK_API + "/api/formPayments/", payment, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalInsert()
                    this.getFormPayment();
                    resolve(response);
                }, reject);
        });
    }
}
