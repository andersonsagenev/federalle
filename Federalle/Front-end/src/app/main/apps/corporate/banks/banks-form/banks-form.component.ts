import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Banks } from 'app/main/apps/corporate/banks/banks.model';

@Component({
    selector     : 'banks-form-dialog',
    templateUrl  : './banks-form.component.html',
    styleUrls    : ['./banks-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class BankFormDialogComponent
{
    action: string;
    banks: Banks;
    banksForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<BankFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<BankFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Editar Banco';
            this.banks = _data.banks;
        }
        else
        {
            this.dialogTitle = 'Novo Banco';
            this.banks = new Banks({});
        }

        this.banksForm = this.createBankForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create banks form
     *
     * @returns {FormGroup}
     */
    createBankForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.banks.id],
            name    : [this.banks.name],
            codeFebraban    : [this.banks.codeFebraban],
            handle    : [this.banks.handle],
            canErase : [this.banks.canErase]
           
        });
    }
}
