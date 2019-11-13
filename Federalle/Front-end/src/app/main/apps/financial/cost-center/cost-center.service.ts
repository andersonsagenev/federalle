import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { MK_API } from "app/app.api";
import { MK_TOKEN } from "app/app.token";
import { CostCenter } from "app/main/apps/financial/cost-center/cost-center.model";
import { FuseUtils } from "@fuse/utils";
import { ConfirmService } from "@fuse/services/confirm.service";

const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});

@Injectable()
export class CostCenterService implements Resolve<any> {
    onChanged: BehaviorSubject<any>;
    onCostCenterChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;

    searchText: string;
    routeParams: any;
    costCenter: CostCenter[];

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
        this.onCostCenterChanged = new BehaviorSubject([]);
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
            Promise.all([this.getCostCenter()]).then(([files]) => {
                this.onSearchTextChanged.subscribe(searchText => {
                    this.searchText = searchText;
                    this.getCostCenter();
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
    getCostCenter(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/formPayments/", { headers: headers })
                .subscribe((response: any) => {
                    this.costCenter = response;
                    console.log('Retorno de Cost Center', response)
                    if (this.searchText && this.searchText !== "") {
                        this.costCenter = FuseUtils.filterArrayByString(
                            this.costCenter,
                            this.searchText
                        );
                    }
                    if(this.costCenter){
                    this.costCenter = this.costCenter.map(item => {
                        return new CostCenter(item);
                    });
                }

                    this.onCostCenterChanged.next(this.costCenter);
                    resolve(this.costCenter);
                }, reject);
        });
    }

    /**
     * Save Centro Custo
     *
     * @param item
     * @returns {Promise<any>}
     */
    updateCostCenter(item): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .put(MK_API + "/api/CostCenter/" + item.id, item, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalUpdate()
                    this.getCostCenter();
                    resolve(response);
                }, reject);
        });
    }

    /**
     * delete centro custo
     *
     * @param item
     * @returns {Promise<any>}
     */
    deleteCentroCusto(item): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .delete(MK_API + "/api/CostCenter/" + item.id, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this.getCostCenter()
                    resolve(response);
                }, reject);
        });
        

       
    }

    /**
     * Add Centro Custo
     *
     * @param item
     * @returns {Promise<any>}
     */
    addCostCenter(item): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(MK_API + "/api/CostCenter/", item, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this._alert.SwalInsert()
                    this.getCostCenter();
                    resolve(response);
                }, reject);
        });
    }
}
