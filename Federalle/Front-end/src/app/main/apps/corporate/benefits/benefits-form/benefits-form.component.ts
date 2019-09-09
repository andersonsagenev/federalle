import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { Benefits } from 'app/main/apps/corporate/benefits/benefits.model';
import { BenefitsService } from "../benefits.service";

@Component({
    selector     : 'benefits-form-dialog',
    templateUrl  : './benefits-form.component.html',
    styleUrls    : ['./benefits-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ]
})

export class BenefitsFormDialogComponent
{
    action: string;
    bem: Benefits;
    bemForm: FormGroup;
    dialogTitle: string;
    planos: any;

    /**
     * Constructor
     *
     * @param {MatDialogRef<BenefitsFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<BenefitsFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        public _benefitsService: BenefitsService
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Editar Bem';
            this.bem = _data.benefit;
        }
        else
        {
            this.dialogTitle = 'Novo Bem';
            this.bem = new Benefits({});
        }

        this.bemForm = this.createBenefitsForm();
    }

     /**
     * On init
     */
    ngOnInit(): void
    {
        // dropdown planos
        this._benefitsService.onPlanoChanged.subscribe(data => {
                this.planos = data;
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create Benefits
     *
     * @returns {FormGroup}
     */
    createBenefitsForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.bem.id],
            name    : [this.bem.name],
            codeBenefit    : [this.bem.codeBenefit],
            idPlan    : [this.bem.idPlan],
            valueCredit    : [this.bem.valueCredit],
            prompt    : [this.bem.prompt],
            assemblyDate    : [this.bem.assemblyDate],
            dueDate    : [this.bem.dueDate],
            registerDate    : [this.bem.registerDate],
            handle : [this.bem.handle],
            canErase : [this.bem.canErase]
        });
       
    }
}
