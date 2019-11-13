import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { CostCenter } from 'app/main/apps/financial/cost-center/cost-center.model';

@Component({
    selector     : 'cost-center-form-dialog',
    templateUrl  : './cost-center-form.component.html',
    styleUrls    : ['./cost-center-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CostCenterFormDialogComponent
{
    action: string;
    costs: CostCenter;
    costCenterForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<CostCenterFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<CostCenterFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        this.dialogTitle = '';
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Editar Centro de Custo';
            this.costs = _data.costs;
        }
        else
        {
            this.dialogTitle = 'Novo Centro de Custo';
            this.costs = new CostCenter({});
        }

        this.costCenterForm = this.createFormCostCenter();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create costs form
     *
     * @returns {FormGroup}
     */
    createFormCostCenter(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.costs.id],
            name    : [this.costs.name],
            handle    : [this.costs.handle],
            canErase : [this.costs.canErase]
           
        });
    }
}
