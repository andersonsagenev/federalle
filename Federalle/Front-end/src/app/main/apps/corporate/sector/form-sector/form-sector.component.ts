import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Sector } from 'app/main/apps/corporate/sector/sector.model';

@Component({
    selector     : 'form-sector-dialog',
    templateUrl  : './form-sector.component.html',
    styleUrls    : ['./form-sector.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SectorFormDialogComponent
{
    action: string;
    sector: Sector;
    sectorForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<SectorFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<SectorFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Editar Setor Verificação';
            this.sector = _data.sector;
        }
        else
        {
            this.dialogTitle = 'Novo Setor Verificação';
            this.sector = new Sector({});
        }

        this.sectorForm = this.createSectorForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create sector form
     *
     * @returns {FormGroup}
     */
    createSectorForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.sector.id],
            name    : [this.sector.name],
            handle    : [this.sector.handle],
            canErase : [this.sector.canErase]
           
        });
    }
}
