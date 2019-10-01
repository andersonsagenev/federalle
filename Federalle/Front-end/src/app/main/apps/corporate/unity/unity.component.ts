import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FuseConfigService } from "@fuse/services/config.service";
import { Subject } from "rxjs";
import { CepService } from "@fuse/services/cep.service";
import { RequestService } from "@fuse/services/request.service";
import { ConfirmService } from "@fuse/services/confirm.service";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Cep } from "../../../../models/cep";
import { locale as english } from "app/main/apps/corporate/unity//i18n/en";
import { locale as portuguese } from "app/main/apps/corporate/unity//i18n/pt";
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { UnityService } from "../unity/unity.service";
import { FuseUtils } from "@fuse/utils";
import { takeUntil } from "rxjs/internal/operators";
import { Unity } from "../unity/unity.model";

@Component({
    selector: "unity",
    templateUrl: "./unity.component.html",
    styleUrls: ["./unity.component.scss"],
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
export class UnityComponent implements OnInit, OnDestroy {
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
    formUnity: FormGroup;
    unityId: any;
    userLog: any;
    roles: any = [];
    idCompany: any;
    user: any;
    role: any;
    unity: any;
    estados: any;
    cidades: any;
    pageType: string;
    isLoading: boolean = false;
    _disabled: boolean = false;
    isChecked: boolean = false;
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
        private _unityService: UnityService
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
        this._fuseTranslationLoaderService.loadTranslations( english, portuguese );
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
         if (this.userLog) {
         } else {
             this.logout();
         }

        // dropdown estados
        this._unityService.onUfsChanged.subscribe(data => {
            this.estados = data;
        });
        // dropdown cidades
        // this._unityService.onCitysChanged.subscribe(data => {
        //     this.cidades = data;
        // });

        this.formUnity = this._formBuilder.group({
            name: ["", Validators.required],
            email1: ['', [Validators.required, Validators.email]],
            email2:  ['', [Validators.email]],
            telefone1: ["", Validators.required],
            telefone2: [""],
            im: [""],
            percentage: [""],
            cnpj: ["", Validators.required],
            withholdTaxes: [""],
            cep: ["", Validators.maxLength(9)],
            address: [""],
            number: [""],
            complement: [""],
            district: [""],
            idCity: [null] ,
            idUf: [null]
        });

        // Id params
        this._route.params.subscribe(params => {
            this.unityId = params["id"];
            if (this.unityId != "new") {
                
            }
        });

        // Id module routeParams
        const routeParams = this._route.snapshot.params;
        if (routeParams && routeParams.company) {
        }

        this._unityService.onUnityChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                if (data) {
                    this.unity = new Unity(data);
                    console.log('estado ~~>', this.unity.idUf)
                    this.getCidades(this.unity.idUf)
                    console.log('Cliente para Update', data )
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.unity = new Unity([]);
                }

                this.formUnity = this.createUnityForm();
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

    getCidades(estado) {
        let id = estado.value ? estado.value : estado
        console.log("estado ~~>", id);
        this._unityService.getCitys(id).then(() => {
            this._unityService.onCitysChanged.subscribe(data => {
                this.cidades = data;
            });
        });
    }

    /**
     * Create Unity form
     *
     * @returns {FormGroup}
     */
    createUnityForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.unity.id],
            name: [this.unity.name],
            handle: [this.unity.handle],
            idCity: [this.unity.idCity],
            idUf: [this.unity.idUf],
            cnpj: [this.unity.cnpj],
            registerDate: [this.unity.registerDate],
            telefone1: [this.unity.telefone1],
            telefone2: [this.unity.telefone2],
            im: [this.unity.im],
            email1: [this.unity.email1],
            email2: [this.unity.email2],
            percentage: [this.unity.percentage],
            withholdTaxes: [this.unity.withholdTaxes],
            cep: [this.unity.cep],
            address: [this.unity.address],
            number: [this.unity.number],
            complement: [this.unity.complement],
            district: [this.unity.district]
        });
       
        
    }

    searchCep() {
        this.isLoading = true;
        let cep = this.formUnity.get("cep").value;
        console.log("cep ~~>", cep);
        if (cep != null && cep !== "") {
            this._cepService.buscaCep(cep).subscribe((dt: any) => {
                 console.log('retorno dt', dt)
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
        this.formUnity.patchValue({
            cep: item.cep,
            address: item.logradouro,
            complement: item.complemento,
            district: item.bairro
        });
    }

    resetaDadosForm() {
        this.formUnity.patchValue({
            cep: null,
            address: null,
            complement: null,
            number: null,
            district: null
        });
    }

    // Save Unity
    onSaveUnity() {
        const data = this.formUnity.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        if (data.idCity == "") {
            data.idCity = null;
        }
        if (data.idUf == "") {
            data.idUf = null;
        }
        console.log("rormulario unidade", data);

        this._unityService.addUnity(data).then(() => {
            this._unityService.onUnityChanged.next(data);
           
            this._router.navigate(["/apps/corporate/units"]);
            this._alert.SwalInsert();
        });
    }
    
    //Update Unity
    onEditUnity() {
        const data = this.formUnity.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        this._unityService.saveUnity(data).then(() => {
            this._unityService.onUnityChanged.next(data);

            this._alert.SwalInsert();
            this._router.navigate(["/apps/corporate/units"]);
        });
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
