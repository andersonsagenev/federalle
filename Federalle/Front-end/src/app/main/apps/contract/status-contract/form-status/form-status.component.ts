import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Status } from 'app/main/apps/contract/status-contract/status.model';

@Component({
    selector     : 'form-status-dialog',
    templateUrl  : './form-status.component.html',
    styleUrls    : ['./form-status.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class StatusFormDialogComponent
{
    action: string;
    status: Status;
    statusForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<StatusFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<StatusFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Editar Status de Contrato';
            this.status = _data.status;
        }
        else
        {
            this.dialogTitle = 'Novo Status de Contrato';
            this.status = new Status({});
        }

        this.statusForm = this.createStatusForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create status form
     *
     * @returns {FormGroup}
     */
    createStatusForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.status.id],
            name    : [this.status.name],
            handle    : [this.status.handle],
            canErase : [this.status.canErase]
           
        });
    }
}
