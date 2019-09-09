import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { StatusContract } from 'app/main/apps/contract/status-representative/status-representative.model';

@Component({
    selector     : 'form-representative-dialog',
    templateUrl  : './form-representative.component.html',
    styleUrls    : ['./form-representative.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class StatusRepFormDialogComponent
{
    action: string;
    status: StatusContract;
    statusForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<StatusRepFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<StatusRepFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Editar Status Representante ';
            this.status = _data.status;
        }
        else
        {
            this.dialogTitle = 'Novo Status de Representante';
            this.status = new StatusContract({});
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
