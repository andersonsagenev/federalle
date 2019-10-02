import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { MK_API } from "app/app.api";
import { MK_TOKEN } from "app/app.token";
import { Ufs } from '../../../../models/ufs';
import { City } from '../../../../models/citys';

const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});

@Injectable()
export class CustomerService implements Resolve<any>
{
    routeParams: any;
    customers: any[];
    onCustomerChanged: BehaviorSubject<any>;
    onUfsChanged: BehaviorSubject<any>;
    onCitysChanged: BehaviorSubject<any>;

    estados: Ufs[];
    cidades: City[];

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
        this.onCustomerChanged = new BehaviorSubject({});
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
        console.log('paramentro ==>', this.routeParams)

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getClients(),
                // this.getCitys(),
                this.getUfs()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
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
     * Get Client
     *
     * @returns {Promise<any>}
     */
    getClients(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onCustomerChanged.next(false);
                resolve(false);
            }
            else
            {
                this._httpClient.get( MK_API + '/api/clients/' + this.routeParams.id, { headers: headers })
                    .subscribe((response: any) => {
                        this.customers = response;
                        this.onCustomerChanged.next(this.customers);
                        resolve(response);
                    }, reject);
            }
        });
    }


    /**
     * Save Clients
     *
     * @param Clients
     * @returns {Promise<any>}
     */
    saveClient(cliente): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.put(MK_API + '/api/Clients/' + cliente.id, cliente)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add Clients
     *
     * @param Clients
     * @returns {Promise<any>}
     */
    addClient(cliente): Promise<any>
    {
        console.log('Cliente que chegou ~~>', cliente)
        return new Promise((resolve, reject) => {
            this._httpClient.post(MK_API + '/api/clients/', cliente, { headers: headers })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
