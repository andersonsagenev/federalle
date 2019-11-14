import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RegionService } from "../region.service";
import { Region } from 'app/main/apps/corporate/region/region.model';

@Component({
    selector     : 'region-form-dialog',
    templateUrl  : './region-form.component.html',
    styleUrls    : ['./region-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class RegionFormDialogComponent
{
    action: string;
    region: Region;
    regionForm: FormGroup;
    dialogTitle: string;
    consorcios: any;

    /**
     * Constructor
     *
     * @param {MatDialogRef<RegionFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<RegionFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        public _regionService: RegionService
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Editar Código de Região';
            this.region = _data.region;
        }
        else
        {
            this.dialogTitle = 'Novo Código de Região';
            this.region = new Region({});
        }

        this.regionForm = this.createRegionForm();
    }

     /**
     * On init
     */
    ngOnInit(): void
    {
        // dropdown consorcios
        this._regionService.onConsorcioChanged.subscribe(data => {
                this.consorcios = data;
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create region code
     *
     * @returns {FormGroup}
     */
    createRegionForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.region.id],
            name    : [this.region.name],
    idConsortium    : [this.region.idConsortium],
            handle : [this.region.handle],
            canErase : [this.region.canErase]
        });
       
    }

    
}
