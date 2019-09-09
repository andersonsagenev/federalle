import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Payment } from 'app/main/apps/financial/formPayment/formPayment.model';

@Component({
    selector     : 'form-payment-dialog',
    templateUrl  : './form-payment.component.html',
    styleUrls    : ['./form-payment.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class PaymentFormDialogComponent
{
    action: string;
    payment: Payment;
    paymentForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<PaymentFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<PaymentFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        this.dialogTitle = 'Editar Forma Pagamento';
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Nova Forma de Pagamento';
            this.payment = _data.payment;
        }
        else
        {
            this.dialogTitle = '';
            this.payment = new Payment({});
        }

        this.paymentForm = this.createFormPayment();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create payment form
     *
     * @returns {FormGroup}
     */
    createFormPayment(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.payment.id],
            name    : [this.payment.name],
            handle    : [this.payment.handle],
            canErase : [this.payment.canErase]
           
        });
    }
}
