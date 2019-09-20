import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { ReceiptCommission } from 'app/main/apps/financial/receiptCommissions/receiptCommissions.model';
import { ReceiptCommissionService } from "../receiptCommissions.service";

@Component({
    selector     : 'receiptCommissions-form-dialog',
    templateUrl  : './receiptCommissions-form.component.html',
    styleUrls    : ['./receiptCommissions-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ]
})

export class CommissionsFormDialogComponent
{
    action: string;
    commission: ReceiptCommission;
    commissionForm: FormGroup;
    dialogTitle: string;
    consorcios: any;

    /**
     * Constructor
     *
     * @param {MatDialogRef<CommissionsFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<CommissionsFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        public _commissionService: ReceiptCommissionService
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Editar Bem';
            this.commission = _data.commission;
        }
        else
        {
            this.dialogTitle = 'Novo Bem';
            this.commission = new ReceiptCommission({});
        }

        this.commissionForm = this.createCommissionForm();
    }

     /**
     * On init
     */
    ngOnInit(): void
    {
        // dropdown consorcios
        this._commissionService.onConsorcioChanged.subscribe(data => {
                this.consorcios = data;
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create Commissions
     *
     * @returns {FormGroup}
     */
    createCommissionForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.commission.id],
            parcel    : [this.commission.parcel],
            quantity    : [this.commission.quantity],
            idConsortium    : [this.commission.idConsortium],
            credit    : [this.commission.credit],
            fatorCommission    : [this.commission.fatorCommission],
            valueCommission    : [this.commission.valueCommission],
            dueDate    : [this.commission.dueDate],
            registerDate    : [this.commission.registerDate],
            canErase : [this.commission.canErase]
        });
       
    }
}
