import { Component, OnDestroy, OnInit } from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    FormControl,
    ValidatorFn,
    Validators
} from "@angular/forms";
import { FuseConfigService } from "@fuse/services/config.service";
import { Subject } from "rxjs";
import { CepService } from "@fuse/services/cep.service";
import { RequestService } from "@fuse/services/request.service";
import { ConfirmService } from "@fuse/services/confirm.service";
import { CustomerService } from "../customer/customer.service";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Cep } from "../../../../models/cep";
import { takeUntil } from "rxjs/internal/operators";
import { locale as english } from "app/main/apps/corporate/customer//i18n/en";
import { locale as portuguese } from "app/main/apps/corporate/customer//i18n/pt";
import {
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter
} from "@angular/material-moment-adapter";
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE
} from "@angular/material/core";
import { Customer } from "../customer/customer.model";
import { FuseUtils } from "@fuse/utils";
import { MatSnackBar } from "@angular/material";
import { Location } from '@angular/common';

@Component({
    selector: "customer",
    templateUrl: "./customer.component.html",
    styleUrls: ["./customer.component.scss"],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: "pt-br" },
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE]
        },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
    ]
})
export class CustomerComponent implements OnInit, OnDestroy {
    public maskTelefone = [
        "+",
        /[1-9]/,
        /\d/,
        " ",
        "(",
        /[1-9]/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
    ];
    public maskCelular = [
        "+",
        /[1-9]/,
        /\d/,
        " ",
        "(",
        /[1-9]/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
    ];
    public cpfMask = [
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/
    ];
    public cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];
    public cnpjMask = [
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "/",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/
    ];

    formCustomer: FormGroup;
    pageType: string;
    customerId: any;
    userLog: any;
    roles: any = [];
    idCompany: any;
    user: any;
    role: any;
    estados: any;
    cidades: any;
    client: Customer;
    isLoading: boolean = false;
    _disabled: boolean = false;
    cep = new Cep();

    typeClient=[{
      id:0,
      name:'Física'
    },{
      id:1,
      name:'Jurídico'
    }]

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _request: RequestService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _cepService: CepService,
        private _alert: ConfirmService,
        public _customerService: CustomerService,
        private _matSnackBar: MatSnackBar,
        private _location: Location,
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                footer: {
                    hidden: true
                }
            }
        };
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        // Load the translations
        this._fuseTranslationLoaderService.loadTranslations(
            english,
            portuguese
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // recuperar dados usuário logado
        this.userLog = localStorage.getItem("user");

        // dropdown estados
        this._customerService.onUfsChanged.subscribe(data => {
            this.estados = data;
        });
        // dropdown cidades
        this._customerService.onCitysChanged.subscribe(data => {
            this.cidades = data;
        });

        this.formCustomer = this._formBuilder.group({
            name: ["", Validators.required],
            email1: ["", Validators.required, Validators.email],
            email2: ["", Validators.email],
            email3: ["", Validators.email],
            telefone1: ["", Validators.required],
            type: new FormControl([ this.typeClient[0].id ] ),
           // type: [ null , Validators.required],
            telefone2: [""],
            telefone3: [""],
            dad: [""],
            mom: [""],
            contact: [""],
            birthDate: [null],
            cpfCnpj: ["", Validators.required],
            zip: ["", Validators.maxLength(9)],
            andress: [""],
            number: [""],
            complement: [""],
            district: [""],
            idCity: [null] ,
            idUf: [null]
        });

        // const toSelect = this.typeClient.find( t => t.id == 0);
        // this.formCustomer.get('type').setValue(toSelect.id);

        this.formCustomer.controls['type'].setValue(this.typeClient[0].id); 

        // Id params
        this._route.params.subscribe(params => {
            this.customerId = params["id"];
            // if (this.customerId != 'new') {
            //   this.retrieveUsers()
            // }
        });

       

        // Id module routeParams
        const routeParams = this._route.snapshot.params;
        if (routeParams && routeParams.company) {
        }

        this._customerService.onCustomerChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                if (data) {
                    this.client = new Customer(data);
                    console.log('Cliente para Update', data )
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.client = new Customer([]);
                }

                this.formCustomer = this.createCustomerForm();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Create Customer form
     *
     * @returns {FormGroup}
     */
    createCustomerForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.client.id],
            name: [this.client.name],
            handle: [this.client.handle],
            idCity: [this.client.idCity],
            idUf: [this.client.idUf],
            cpfCnpj: [this.client.cpfCnpj],
            contact: [this.client.contact],
            registerDate: [this.client.registerDate],
            birthDate: [this.client.birthDate],
            dad: [this.client.dad],
            mom: [this.client.mom],
            type: [this.client.type],
            telefone1: [this.client.telefone1],
            telefone2: [this.client.telefone2],
            telefone3: [this.client.telefone3],
            email1: [this.client.email1],
            email2: [this.client.email2],
            email3: [this.client.email3],
            zip: [this.client.zip],
            andress: [this.client.andress],
            number: [this.client.number],
            complement: [this.client.complement],
            district: [this.client.district]
        });
    }

    searchCep() {
        this.isLoading = true;
        let cep = this.formCustomer.get("zip").value;
        console.log("cep ~~>", cep);
        if (cep != null && cep !== "") {
            this._cepService.buscaCep(cep).subscribe((dt: any) => {
                // console.log('retorno dt', dt)
                if (dt.erro) {
                    this.resetaDadosForm();
                    this._alert.SwalCleanCep();
                    this.isLoading = false;
                    return;
                }
                this.populateAddress(dt);
            });
            this.isLoading = false;
        } else {
            this._alert.SwalCleanCep();
            this.isLoading = false;
        }
    }
    
    populateAddress(item: any) {
        this.formCustomer.patchValue({
            zip: item.cep,
            andress: item.logradouro,
            complement: item.complemento,
            district: item.bairro,
            city: item.localidade,
            uf: item.uf
        });
    }

    resetaDadosForm() {
        this.formCustomer.patchValue({
            zip: null,
            andress: null,
            complement: null,
            number: null,
            district: null
        });
    }
    
    // Save Client
    onSaveClient() {
        const data = this.formCustomer.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        if(data.birthDate == ""){
          data.birthDate = null;
        }
        if(data.idCity == ""){
          data.idCity = null;
        }
        if(data.idUf == ""){
          data.idUf = null;
        }
        console.log('rormulario', data)

        this._customerService.addClient(data).then(() => {
           
            this._customerService.onCustomerChanged.next(data);

            this._alert.SwalInsert();
            this._router.navigate(["/apps/corporate/customers"]);
          
        });
    }
    //Update Client
    onEditClient() {

      const data = this.formCustomer.getRawValue();
      data.handle = FuseUtils.handleize(data.name);

      this._customerService.saveClient(data).then(() => {
         
          this._customerService.onCustomerChanged.next(data);

          this._alert.SwalInsert();
          this._router.navigate(["/apps/corporate/customers"]);
    })
  }

    logout(): void {
        this._request.server("/api/logout", "post").subscribe(
            data => {
                localStorage.removeItem("user");
                this._router.navigate(["/pages/login"]);
            },
            error => {
                console.log("Error", error);
            }
        );
    }
}
