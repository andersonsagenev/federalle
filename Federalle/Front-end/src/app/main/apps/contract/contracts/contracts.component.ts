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
import { ContractsService } from "../contracts/contracts.service";
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
import { Contract } from "../contracts/contracts.model";
import { FuseUtils } from "@fuse/utils";
import { MatSnackBar } from "@angular/material";
import { Location } from '@angular/common';

@Component({
    selector: "contracts",
    templateUrl: "./contracts.component.html",
    styleUrls: ["./contracts.component.scss"],
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
export class ContractsComponent implements OnInit, OnDestroy {
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

    formContract: FormGroup;
    pageType: string;
    contractId: any;
    userLog: any;
    roles: any = [];
    idCompany: any;
    user: any;
    role: any;
    clientes: any;
    pagamentos: any;
    beneficios: any;
    representantes: any;
    contract: Contract;
    isLoading: boolean = false;
    _disabled: boolean = false;
    cep = new Cep();

  
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
        public _contractsService: ContractsService,
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

        // dropdown clientes
        this._contractsService.onClientsChanged.subscribe(data => {
            this.clientes = data;
            console.log('Clientes ~~~~~~~>', this.clientes)
        });
        // dropdown forma pagamento
        this._contractsService.onPaymentChanged.subscribe(data => {
            this.pagamentos = data;
        });
        // dropdown beneficios
        this._contractsService.onBenefitsChanged.subscribe(data => {
            this.beneficios = data;
        });

        this.formContract = this._formBuilder.group({
            idClient: ["", Validators.required],
            idRepresentative: ["", Validators.required],
            idBenefit: ["", Validators.required],
            idFormPayment: ["", Validators.required],
            idSalesMan: [""],
            email1: ["", Validators.required, Validators.email],
            email2: ["", Validators.email],
            email3: ["", Validators.email],
            telefone1: ["", Validators.required],
            telefone2: [""],
            telefone3: [""],
            paydat: [""],
            serie: [""],
            grupo: [""],
            registerDate: [null],
            cota: ["", Validators.required],
            codeCv: [""],
            dueDate: [""],
            assemblyDate: [""],
            promptInitial: [""],
            promptCurrent: [""],
            checking: [true] ,
            assembli: [true],
            ticket: [true],
            active: [true]
          
        });
       
         this.formContract.get('registerDate').setValue(new Date());


        // Id params
        this._route.params.subscribe(params => {
            this.contractId = params["id"];
            // if (this.customerId != 'new') {
            //   this.retrieveUsers()
            // }
        });

       

        // Id module routeParams
        const routeParams = this._route.snapshot.params;
        if (routeParams && routeParams.company) {
        }

        this._contractsService.onContractChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                if (data) {
                    this.contract = new Contract(data);
                    console.log('Cliente para Update', data )
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.contract = new Contract([]);
                }

                this.formContract = this.createContractForm();
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
     * Create Contract form
     *
     * @returns {FormGroup}
     */
    createContractForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.contract.id],
            idClient: [this.contract.idClient],
            idRepresentative: [this.contract.idRepresentative],
            idSalesMan: [this.contract.idSalesMan],
            idBenefit: [this.contract.idBenefit],
            idFormPayment: [this.contract.idFormPayment],
            paydat: [this.contract.paydat],
            registerDate: [this.contract.registerDate],
            serie: [this.contract.serie],
            grupo: [this.contract.grupo],
            cota: [this.contract.cota],
            codeCv: [this.contract.codeCv],
            telefone1: [this.contract.telefone1],
            telefone2: [this.contract.telefone2],
            telefone3: [this.contract.telefone3],
            email1: [this.contract.email1],
            email2: [this.contract.email2],
            email3: [this.contract.email3],
            dueDate: [this.contract.dueDate],
            assemblyDate: [this.contract.assemblyDate],
            promptInitial: [this.contract.promptInitial],
            promptCurrent: [this.contract.promptCurrent],
            checking: [this.contract.checking],
            assembli: [this.contract.assembli],
            ticket: [this.contract.ticket],
            active: [this.contract.active]
        });
    }

    
    // Save Contract
    onSaveContract() {
        const data = this.formContract.getRawValue();

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

        this._contractsService.addContract(data).then(() => {
           
            this._contractsService.onContractChanged.next(data);

            this._alert.SwalInsert();
            this._router.navigate(["/apps/contract/list-contracts"]);
          
        });
    }
    //Update Contract
    onEditContract() {

      const data = this.formContract.getRawValue();
     

      this._contractsService.saveContract(data).then(() => {
         
          this._contractsService.onContractChanged.next(data);

          this._alert.SwalInsert();
          this._router.navigate(["/apps/contract/list-contracts"]);
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
