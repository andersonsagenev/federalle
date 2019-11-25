import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Services } from 'app/main/apps/financial/services/services.model';

@Component({
    selector     : 'services-form-dialog',
    templateUrl  : './services-form.component.html',
    styleUrls    : ['./services-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ServicesFormDialogComponent
{
    action: string;
    services: Services;
    serviceForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ServicesFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ServicesFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        this.dialogTitle = '';
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Editar Serviço';
            this.services = _data.costs;
        }
        else
        {
            this.dialogTitle = 'Novo Serviço';
            this.services = new Services({});
        }

        this.serviceForm = this.createFormService();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create service form
     *
     * @returns {FormGroup}
     */
    createFormService(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.services.id],
            name    : [this.services.name],
            handle    : [this.services.handle],
            canErase : [this.services.canErase]
           
        });
    }
}
