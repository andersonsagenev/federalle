import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Indicator } from 'app/main/apps/financial/indicators/indicators.model';

@Component({
    selector     : 'form-indicator-dialog',
    templateUrl  : './form-indicator.component.html',
    styleUrls    : ['./form-indicator.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class IndicatorFormDialogComponent
{
    action: string;
    indicator: Indicator;
    indicatorForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<IndicatorFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<IndicatorFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        this.dialogTitle = 'Editar Indicador';
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Novo Indicador';
            this.indicator = _data.indicator;
        }
        else
        {
            this.dialogTitle = '';
            this.indicator = new Indicator({});
        }

        this.indicatorForm = this.createFormIndicator();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create indicator form
     *
     * @returns {FormGroup}
     */
    createFormIndicator(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.indicator.id],
            name    : [this.indicator.name],
            // handle    : [this.indicator.handle],
            // canErase : [this.indicator.canErase]
           
        });
    }
}
