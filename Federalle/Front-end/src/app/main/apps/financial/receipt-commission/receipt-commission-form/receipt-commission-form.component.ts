import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { ReceiptCommission } from 'app/main/apps/financial/receipt-commission/receipt-commission.model';
import { ReceiptCommissionService } from "../receipt-commission.service";

@Component({
    selector     : 'receipt-commission-form-dialog',
    templateUrl  : './receipt-commission-form.component.html',
    styleUrls    : ['./receipt-commission-form.component.scss'],
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
    receiptForm: FormGroup;
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
            this.dialogTitle = 'Comissão Recebimento Federalle';
            this.commission = _data.commission;
        }
        else
        {
            this.dialogTitle = 'Comissão Recebimento Federalle';
            this.commission = new ReceiptCommission({});
        }

        this.receiptForm = this.createCommissionForm();
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
            value    : [this.commission.value],
            idConsortium    : [this.commission.idConsortium],
           
            startDate    : [this.commission.startDate],
            idCommissionReceipt    : [this.commission.idCommissionReceipt],
            percentage    : [this.commission.percentage],
            active    : [this.commission.active],
            registerDate    : [this.commission.registerDate],
            canErase : [this.commission.canErase]
        });
       
    }
}
