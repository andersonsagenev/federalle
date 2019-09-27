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
export class UnityService implements Resolve<any>
{
    routeParams: any;
<<<<<<< HEAD
    customers: any[];
    onUnityChanged: BehaviorSubject<any>;
    onUfsChanged: BehaviorSubject<any>;
    onCitysChanged: BehaviorSubject<any>;
    estados: Ufs[];
    cidades: City[];
=======
    unities: any[];
    estados: Ufs[];
    cidades: City[];

    onUnityChanged: BehaviorSubject<any>;
    onUfsChanged: BehaviorSubject<any>;
    onCitysChanged: BehaviorSubject<any>;

   

>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f
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
        this.onUnityChanged = new BehaviorSubject({});
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
<<<<<<< HEAD
                this.getUnits(),
                this.getCitys(),
                this.getUfs()
=======
                // this.getCitys(),
                this.getUfs(),
                this.getUnities()
>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

<<<<<<< HEAD
       /**
=======
        /**
>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f
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
<<<<<<< HEAD
     */
    getCitys(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/cities/", { headers: headers })
=======
     */ 
    getCitys(idUf: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/Auxiliar/GetCity/" + idUf, { headers: headers })
>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f
                .subscribe((response: any) => {
                    this.cidades = response;
                   console.log('retorno cidades', response)
                    this.cidades = this.cidades.map(city => {
                        return new City(city);
                    });
                    this.onCitysChanged.next(this.cidades);
                    resolve(this.cidades);
                }, reject);
        });
    }

    /**
     * Get unities
     *
     * @returns {Promise<any>}
     */
<<<<<<< HEAD
    getUnits(): Promise<any>
=======
    getUnities(): Promise<any>
>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onUnityChanged.next(false);
                resolve(false);
            }
            else
            {
<<<<<<< HEAD
                this._httpClient.get(MK_API + '/api/Unities/' + this.routeParams.id, { headers: headers } )
                    .subscribe((response: any) => {
                        this.customers = response;
                        this.onUnityChanged.next(this.customers);
=======
                this._httpClient.get('/api/Unities/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.unities = response;
                        this.onUnityChanged.next(this.unities);
>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f
                        resolve(response);
                    }, reject);
            }
        });
    }

<<<<<<< HEAD
    /**
     * Save Unity
     *
     * @param Unity
=======
     /**
     * Save Unity
     *
     * @param unity
>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f
     * @returns {Promise<any>}
     */
    saveUnity(unity): Promise<any>
    {
        return new Promise((resolve, reject) => {
<<<<<<< HEAD
            this._httpClient.put(MK_API + '/api/Unities/' + unity.id, unity, { headers: headers })
=======
            this._httpClient.put(MK_API + '/api/Unities/' + unity.id, unity)
>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

<<<<<<< HEAD
    /**
     * Add unity
=======
    /**s
     * Add Unity
>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f
     *
     * @param unity
     * @returns {Promise<any>}
     */
    addUnity(unity): Promise<any>
    {
        console.log('Unidade que chegou ~~>', unity)
        return new Promise((resolve, reject) => {
            this._httpClient.post(MK_API + '/api/Unities/', unity, { headers: headers })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
