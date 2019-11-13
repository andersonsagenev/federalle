import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { CepService } from "@fuse/services/cep.service";
import { ConfirmService } from "@fuse/services/confirm.service";

import { Representative } from 'app/main/apps/representative/form-representative/representative.model';
import { RepresentativeService } from 'app/main/apps/representative/form-representative/form-representative.service';

@Component({
    selector     : 'form-representative',
    templateUrl  : './form-representative.component.html',
    styleUrls    : ['./form-representative.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class RepresentativeComponent implements OnInit, OnDestroy
{
    representante: Representative;
    pageType: string;
    representativeForm: FormGroup;
    isLoading: boolean = false;
    estados: any;
    cidades: any;
    status: any;
    banks: any;
    masters: any;

    typeClient: any = [
        {
        id:0,
        name:'Física'
      },{
        id:1,
        name:'Jurídico'
      }]

      public maskTelefone = [
        "+",/[1-9]/,/\d/," ","(",/[1-9]/,/\d/,")"," ",/\d/,/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/,/\d/
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

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {RepresentativeService} _representativeService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _representativeService: RepresentativeService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private _cepService: CepService,
        private _alert: ConfirmService,
    )
    {
        // Set the default
        this.representante = new Representative();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
         // dropdown estados
         this._representativeService.onUfsChanged.subscribe(data => {
            this.estados = data;
        });

         // dropdown status contract
         this._representativeService.onStatusChanged.subscribe(data => {
            this.status = data;
        });

         // dropdown banks
         this._representativeService.onBanksChanged.subscribe(data => {
            this.banks = data;
        });

        this.representativeForm = this._formBuilder.group({
            name: ['', Validators.required],
            email1: ['', Validators.required, Validators.email],
            email2: ['', Validators.email],
            email3: ['', Validators.email],
            telefone1: ['', Validators.required],
            telefone2: [''],
            telefone3: [''],
            idMaster: [null],
            idCity: [null],
            idCity1: [null],
            idStatusPartnershipContract: [null],
            idBank: [null],
            idUser: [null],
            cpfCnpj: ['', Validators.required],
            zip: ['', Validators.maxLength(9)],
            zip1: ['', Validators.maxLength(9)],
            handle: [''],
            nameContact: [''],
            andress: [''],
            andress1: [''],
            number: [''],
            number1: [''],
            complement: [''],
            complement1: [''],
            district: [''],
            district1: [''],
            bankesName: [''],
            bankesCpfCnpj: [''],
            banckAgency: [''],
            bankAccount: [''],
            bankOperation: [''],
            emailFinance: [''],
            withholdTax: [''],
            regionCode: [''],
            idUf: [null],
            idUf1: [null]
        });
       
        this.pageType = 'new';
        // Subscribe to update product on changes
        // this._representativeService.onProductChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(product => {

        //         if ( product )
        //         {
        //             this.product = new Product(product);
        //             this.pageType = 'edit';
        //         }
        //         else
        //         {
        //             this.pageType = 'new';
        //             this.product = new Product();
        //         }

        //         this.representativeForm = this.createRepresentativeForm();
        //     });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
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
        this._representativeService.getCitys(id).then(() => {
            this._representativeService.onCitysChanged.subscribe(data => {
                this.cidades = data;
            });
        });
    }

    /**
     * Create representative form
     *
     * @returns {FormGroup}
     */
    createRepresentativeForm(): FormGroup
    {
        return this._formBuilder.group({
            id              : [this.representante.id],
            name            : [this.representante.name],
            handle          : [this.representante.handle],
            idMaster     : [this.representante.idMaster],
            idCity      : [this.representante.idCity],
            idCity1      : [this.representante.idCity1],
            idStatusPartnershipContract            : [this.representante.idStatusPartnershipContract],
            idBank          : [this.representante.idBank],
            idUser    : [this.representante.idUser],
            cpfCnpj    : [this.representante.cpfCnpj],
            telefone1         : [this.representante.telefone1],
            telefone2         : [this.representante.telefone2],
            telefone3         : [this.representante.telefone3],
            email1   : [this.representante.email1],
            email2   : [this.representante.email2],
            email3   : [this.representante.email3],
            zip        : [this.representante.zip],
            zip1        : [this.representante.zip1],
            andress             : [this.representante.andress],
            andress1             : [this.representante.andress1  ],
            number           : [this.representante.number],
            number1           : [this.representante.number1],
            complement          : [this.representante.complement],
            complement1          : [this.representante.complement1],
            district           : [this.representante.district],
            district1           : [this.representante.district1],
            bankesName          : [this.representante.bankesName],
            bankesCpfCnpj: [this.representante.bankesCpfCnpj],
            banckAgency          : [this.representante.banckAgency],
            bankAccount          : [this.representante.bankAccount],
            bankOperation          : [this.representante.bankOperation],
            emailFinance          : [this.representante.emailFinance],
            withholdTax          : [this.representante.withholdTax],
            regionCode          : [this.representante.regionCode],
            nameContact          : [this.representante.nameContact],
            canErase          : [this.representante.canErase],
        });
    }

    searchCep() {
        this.isLoading = true;
        let cep = this.representativeForm.get("zip").value;
        console.log("cep ~~>", cep);
        if (cep != null && cep !== "") {
            this._cepService.buscaCep(cep).subscribe((dt: any) => {
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
        this.representativeForm.patchValue({
            zip: item.cep,
            andress: item.logradouro,
            complement: item.complemento,
            district: item.bairro,
            city: item.localidade,
            uf: item.uf
        });
    }

    resetaDadosForm() {
        this.representativeForm.patchValue({
            zip: null,
            andress: null,
            complement: null,
            number: null,
            district: null
        });
    }

    searchCepFinanceiro() {
        this.isLoading = true;
        let cep = this.representativeForm.get("zip1").value;
        console.log("cep ~~>", cep);
        if (cep != null && cep !== "") {
            this._cepService.buscaCep(cep).subscribe((dt: any) => {
                if (dt.erro) {
                    this.resetaDadosFormFinanceiro();
                    this._alert.SwalCleanCep();
                    this.isLoading = false;
                    return;
                }
                this.populateAddressFinanceiro(dt);
            });
            this.isLoading = false;
        } else {
            this._alert.SwalCleanCep();
            this.isLoading = false;
        }
    }
    
    populateAddressFinanceiro(item: any) {
        this.representativeForm.patchValue({
            zip1: item.cep,
            andress1: item.logradouro,
            complement1: item.complemento,
            district1: item.bairro,
            city1: item.localidade,
            uf1: item.uf
        });
    }

    resetaDadosFormFinanceiro() {
        this.representativeForm.patchValue({
            zip1: null,
            andress1: null,
            complement1: null,
            number1: null,
            district1: null
        });
    }
    

    /**
     * Save product
     */
    saveProduct(): void
    {
        const data = this.representativeForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        this._representativeService.saveProduct(data)
            .then(() => {

                // Trigger the subscription with new data
                this._representativeService.onRepresentanteChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Product saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
    }

    /**
     * Add representante
     */
    addRepresentante(): void
    {
        const data = this.representativeForm.getRawValue();
        // data.handle = FuseUtils.handleize(data.name);

        this._representativeService.addRepresentante(data)
            .then(() => {

                // Trigger the subscription with new data
                this._representativeService.onRepresentanteChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Product added', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // Change the location with new one
                this._location.go('apps/representative/form-representative/' + this.representante.id + '/' + this.representante.handle);
            });
    }
}
