import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MK_API } from "app/app.api";
import { MK_TOKEN } from "app/app.token";

const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});

@Injectable()
export class UnitsService implements Resolve<any>
{
    clients: any[];
    onCustomersChanged: BehaviorSubject<any>;

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
        this.onCustomersChanged = new BehaviorSubject({});
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
                this.getCustomers()
            ]).then(
                () => {
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
    getCustomers(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(MK_API + "/api/Clients/", { headers: headers })
                .subscribe((response: any) => {
                    this.clients = response;
                    this.onCustomersChanged.next(this.clients);
                    resolve(response);
                }, reject);
        });
    }
}
