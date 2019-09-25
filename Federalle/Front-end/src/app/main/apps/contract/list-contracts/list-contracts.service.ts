import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MK_API } from "app/app.api";
import { MK_TOKEN } from "app/app.token";


const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});

@Injectable()
export class ListContractService implements Resolve<any>
{
    clients: any[];
    searchText: string;
    onListContractsChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;

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
        this.onListContractsChanged = new BehaviorSubject({});
        this.onSearchTextChanged = new Subject();
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
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getContracts(),
               
            ]).then(
                ([files]) => {
                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getContracts()
                    });
                    resolve();
                },
                reject
            );
        });
    }

  

    /**
     * Get clients
     *
     * @returns {Promise<any>}
     */
    getContracts(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(MK_API + "/api/Clients/", { headers: headers })
                .subscribe((response: any) => {
                    this.clients = response;
                    this.onListContractsChanged.next(this.clients);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * delete Client
     *
     * @param client
     * @returns {Promise<any>}
     */
    deleteClient(client): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .delete(MK_API + "/api/clients/" + client.id, {
                    headers: headers
                })
                .subscribe((response: any) => {
                    this.getContracts()
                    resolve(response);
                }, reject);
        });
    }
}
