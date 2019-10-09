import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { MK_API } from "app/app.api";
import { MK_TOKEN } from "app/app.token";
import { Representative } from "app/main/apps/representative/form-representative/representative.model";

const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});

@Injectable()
export class RepresentativesService implements Resolve<any>
{
    representatives: any[];
    onRepresentanteChanged: BehaviorSubject<any>;

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
        this.onRepresentanteChanged = new BehaviorSubject({});
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
                 this.getRepresentantes()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

     /**
     * Get Representantes
     *
     * @returns {Promise<any>}
     */
    getRepresentantes(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(MK_API + "/api/Representatives/", { headers: headers })
                .subscribe((response: any) => {
                    this.representatives = response;

                    // if (this.searchText && this.searchText !== "") {
                    //     this.representatives = FuseUtils.filterArrayByString(
                    //         this.representatives,
                    //         this.searchText
                    //     );
                    // }
                    this.representatives = this.representatives.map(item => {
                        return new Representative(item);
                    });
                    this.onRepresentanteChanged.next(this.representatives);
                    resolve(response);
                }, reject);
        });
    }

}
