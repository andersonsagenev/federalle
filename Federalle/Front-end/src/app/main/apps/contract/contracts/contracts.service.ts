import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { MK_API } from "app/app.api";
import { MK_TOKEN } from "app/app.token";
import { Customer } from '../../corporate/customer/customer.model';
import { Payment } from '../../financial/formPayment/formPayment.model';
import { Benefits } from '../../corporate/benefits/benefits.model';

const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});

@Injectable()
export class ContractsService implements Resolve<any>
{
    routeParams: any;
    contracts: any[];
    onContractChanged: BehaviorSubject<any>;
    onClientsChanged: BehaviorSubject<any>;
    onPaymentChanged: BehaviorSubject<any>;
    onBenefitsChanged: BehaviorSubject<any>;

    clientes: Customer[];
    pagamentos: Payment[];
    beneficios: Benefits[];

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
        this.onContractChanged = new BehaviorSubject({});
        this.onClientsChanged = new BehaviorSubject({});
        this.onPaymentChanged = new BehaviorSubject({});
        this.onBenefitsChanged = new BehaviorSubject({});
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
                this.getPayment(),
                this.getBeneficio()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }
       /**
     * Get Clientes
     *
     * @returns {Promise<any>}
     */
    getClients(): Promise<any> {
        console.log('entrou no cliente..')
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/Clients/", { headers: headers })
                .subscribe((response: any) => {
                    this.clientes = response;
                   console.log('retorno clientes', response)
                    this.clientes = this.clientes.map(cliente => {
                        return new Customer(cliente);
                    });
                    this.onClientsChanged.next(this.clientes);
                    resolve(this.clientes);
                }, reject);
        });
    }

     /**
     * Get Forma Pagamento
     *
     * @returns {Promise<any>}
     */
    getPayment(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/formPayments/", { headers: headers })
                .subscribe((response: any) => {
                    this.pagamentos = response;
                   console.log('retorno pagamentos', response)
                    this.pagamentos = this.pagamentos.map(pagamento => {
                        return new Payment(pagamento);
                    });
                    this.onPaymentChanged.next(this.pagamentos);
                    resolve(this.pagamentos);
                }, reject);
        });
    }

     /**
     * Get Beneficio
     *
     * @returns {Promise<any>}
     */
    getBeneficio(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(MK_API + "/api/benefits/", { headers: headers })
                .subscribe((response: any) => {
                    this.beneficios = response;
                   console.log('retorno beneficios', response)
                    this.beneficios = this.beneficios.map(bem => {
                        return new Benefits(bem);
                    });
                    this.onBenefitsChanged.next(this.beneficios);
                    resolve(this.beneficios);
                }, reject);
        });
    }

    /**
     * Get Contracts
     *
     * @returns {Promise<any>}
     */
    getContracts(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onContractChanged.next(false);
                resolve(false);
            }
            else
            {
                this._httpClient.get( MK_API + '/api/Contracts/' + this.routeParams.id, { headers: headers })
                    .subscribe((response: any) => {
                        this.contracts = response;
                        this.onContractChanged.next(this.contracts);
                        resolve(response);
                    }, reject);
            }
        });
    }


    /**
     * Save Contract
     *
     * @param contract
     * @returns {Promise<any>}
     */
    saveContract(contract): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.put(MK_API + '/api/Contracts/' + contract.id, contract)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add Contract
     *
     * @param contract
     * @returns {Promise<any>}
     */
    addContract(contract): Promise<any>
    {
        console.log('contract que chegou ~~>', contract)
        return new Promise((resolve, reject) => {
            this._httpClient.post(MK_API + '/api/Contracts/', contract, { headers: headers })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
