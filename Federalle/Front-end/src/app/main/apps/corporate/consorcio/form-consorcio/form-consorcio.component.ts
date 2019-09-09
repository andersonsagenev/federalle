import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Consorcio } from 'app/main/apps/corporate/consorcio/consorcio.model';

@Component({
    selector     : 'form-consorcio-dialog',
    templateUrl  : './form-consorcio.component.html',
    styleUrls    : ['./form-consorcio.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ConsorcioFormDialogComponent
{
    action: string;
    consorcio: Consorcio;
    consorcioForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ConsorcioFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ConsorcioFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Editar Consórcio';
            this.consorcio = _data.consorcio;
        }
        else
        {
            this.dialogTitle = 'Novo Consórcio';
            this.consorcio = new Consorcio({});
        }

        this.consorcioForm = this.createConsorcioForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create consorcio form
     *
     * @returns {FormGroup}
     */
    createConsorcioForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.consorcio.id],
            name    : [this.consorcio.name],
            handle    : [this.consorcio.handle],
            canErase : [this.consorcio.canErase]
           
        });
    }
}
