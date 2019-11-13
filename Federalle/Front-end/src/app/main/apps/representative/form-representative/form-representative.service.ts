import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FuseUtils } from '@fuse/utils';
import { MK_API } from "app/app.api";
import { MK_TOKEN } from "app/app.token";
import { Ufs } from '../../../../models/ufs';
import { City } from '../../../../models/citys';
import { Status } from '../../../../models/status';
import { Banks } from '../../../../models/banks';
import { Representative } from 'app/main/apps/representative/form-representative/representative.model';
import { ConfirmService } from "@fuse/services/confirm.service";

const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});


@Injectable()
export class RepresentativeService implements Resolve<any>
{
    routeParams: any;
    representantes: any;
    onRepresentanteChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    searchText: string;

    onBanksChanged: BehaviorSubject<any>;
    onStatusChanged: BehaviorSubject<any>;
    onUfsChanged: BehaviorSubject<any>;
    onCitysChanged: BehaviorSubject<any>;

    estados: Ufs[];
    cidades: City[];
    status: Status[];
    banks: Banks[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private _alert: ConfirmService
    )
    {
        // Set the defaults
        this.onRepresentanteChanged = new BehaviorSubject({});
        this.onSearchTextChanged = new Subject();
        
        this.onBanksChanged = new BehaviorSubject({});
        this.onStatusChanged = new BehaviorSubject({});
        this.onUfsChanged = new BehaviorSubject({});
        this.onCitysChanged = new BehaviorSubject({});
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
        this.routeParams = route.params;
       

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getRepresentative(),
                this.getStatusContract(),
                this.getUfs(),
                this.getBanks()
            ]).then(
                ([files]) => {
                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getRepresentative();
                    });
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get Banks
     *
     * @returns {Promise<any>}
     */
    getBanks(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/banks/", { headers: headers })
                .subscribe((response: any) => {
                    this.banks = response;
                   console.log('retorno banks', response)
                    this.banks = this.banks.map(bank => {
                        return new Banks(bank);
                    });
                    this.onBanksChanged.next(this.banks);
                    resolve(this.banks);
                }, reject);
        });
    }
    /**
     * Get Status Contrato
     *
     * @returns {Promise<any>}
     */
    getStatusContract(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/statusContracts/", { headers: headers })
                .subscribe((response: any) => {
                    this.status = response;
                   console.log('retorno status', response)
                    this.status = this.status.map(uf => {
                        return new Status(uf);
                    });
                    this.onStatusChanged.next(this.status);
                    resolve(this.status);
                }, reject);
        });
    }
    /**
     * Get Estados
     *
     * @returns {Promise<any>}
     */
    getUfs(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/ufs/", { headers: headers })
                .subscribe((response: any) => {
                    this.estados = response;
                   console.log('retorno estados', response)
                    this.estados = this.estados.map(uf => {
                        return new Ufs(uf);
                    });
                    this.onUfsChanged.next(this.estados);
                    resolve(this.estados);
                }, reject);
        });
    }

       /**
     * Get Cidades
     *
     * @returns {Promise<any>}
     */
    getCitys(id): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/Auxiliar/GetCity/" + id , { headers: headers })
                .subscribe((response: any) => {
                    this.cidades = response;
                    this.cidades = this.cidades.map(city => {
                        return new City(city);
                    });
                    this.onCitysChanged.next(this.cidades);
                    resolve(this.cidades);
                }, reject);
        });
    }


    /**
     * Get Representantes
     *
     * @returns {Promise<any>}
     */
    // getRepresentative(): Promise<any>
    // {
    //     return new Promise((resolve, reject) => {
    //         if ( this.routeParams.id === 'new' )
    //         {
    //             this.onRepresentanteChanged.next(false);
    //             resolve(false);
    //         }
    //         else
    //         {
    //             this._httpClient.get( MK_API + 'api/Representatives/' + this.routeParams.id)
    //                 .subscribe((response: any) => {
    //                     this.product = response;
    //                     this.onRepresentanteChanged.next(this.product);
    //                     resolve(response);
    //                 }, reject);
    //         }
    //     });
    // }

      /**
     * Get Representante
     *
     * @returns {Promise<any>}
     */
    getRepresentative(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(MK_API + '/api/Representatives/', { headers: headers })
            .subscribe((response: any) => {
                console.log('representante ~~~>', response)
                this.representantes = response
                if (this.searchText && this.searchText !== "") {
                    this.representantes = FuseUtils.filterArrayByString(
                        this.representantes,
                        this.searchText
                    );
                }
                this.representantes = this.representantes.map(item => {
                    return new Representative(item);
                });
                this.onRepresentanteChanged.next(this.representantes);
                resolve(this.representantes);
            }, reject);
        });
    }

    /**
     * Save product
     *
     * @param product
     * @returns {Promise<any>}
     */
    saveProduct(product): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post( MK_API + '/api/e-commerce-products/' + product.id, product)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add Representante
     *
     * @param representante
     * @returns {Promise<any>}
     */
    addRepresentante(representante): Promise<any>
    {
        console.log('Json Representante ~~>', representante)
        return new Promise((resolve, reject) => {
            this._httpClient.post( MK_API + '/api/Representatives/', representante, { headers: headers })
                .subscribe((response: any) => {
                    this._alert.SwalInsert()
                    this.getRepresentative();
                    resolve(response);
                }, reject);
        });
    }
}
