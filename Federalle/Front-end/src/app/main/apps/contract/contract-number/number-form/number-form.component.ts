import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ContractNumberService } from "../contract-number.service";
import { Number } from 'app/main/apps/contract/contract-number/contract-number.model';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


@Component({
    selector     : 'number-form-dialog',
    templateUrl  : './number-form.component.html',
    styleUrls    : ['./number-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ]
    
})

export class ContractNumberFormDialogComponent
{
    action: string;
    contractNumber: Number;
    numberForm: FormGroup;
    dialogTitle: string;
    consorcios: any;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContractNumberFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ContractNumberFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        public _numberService: ContractNumberService
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Editar Números de Contratos';
            this.contractNumber = _data.number;
        }
        else
        {
            this.dialogTitle = 'Nova Numeração de Contratos';
            this.contractNumber = new Number({});
        }

        this.numberForm = this.createNumberForm();
    }

     /**
     * On init
     */
    ngOnInit(): void
    {
        // dropdown consorcios
        this._numberService.onConsorcioChanged.subscribe(data => {
                this.consorcios = data;
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create Number form
     *
     * @returns {FormGroup}
     */
    createNumberForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.contractNumber.id],
            numberStart   : [this.contractNumber.numberStart],
            numberEnd    : [this.contractNumber.numberEnd],
            idConsortium    : [this.contractNumber.idConsortium],
            idRepresentative    : [this.contractNumber.idRepresentative],
            registerDate : [this.contractNumber.registerDate],
            canErase : [this.contractNumber.canErase]
        });
       
    }

    
}
