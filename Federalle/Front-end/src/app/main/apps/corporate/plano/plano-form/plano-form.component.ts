import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PlanoService } from "../plano.service";
import { Plano } from 'app/main/apps/corporate/plano/plano.model';

@Component({
    selector     : 'plano-form-dialog',
    templateUrl  : './plano-form.component.html',
    styleUrls    : ['./plano-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class PlanoFormDialogComponent
{
    action: string;
    plano: Plano;
    planoForm: FormGroup;
    dialogTitle: string;
    consorcios: any;

    /**
     * Constructor
     *
     * @param {MatDialogRef<PlanoFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<PlanoFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        public _planoService: PlanoService
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Editar Plano';
            this.plano = _data.plano;
        }
        else
        {
            this.dialogTitle = 'Novo Plano';
            this.plano = new Plano({});
        }

        this.planoForm = this.createPlanoForm();
    }

     /**
     * On init
     */
    ngOnInit(): void
    {
        // dropdown consorcios
        this._planoService.onConsorcioChanged.subscribe(data => {
                this.consorcios = data;
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create plano form
     *
     * @returns {FormGroup}
     */
    createPlanoForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.plano.id],
            name    : [this.plano.name],
            numberOfInstallments    : [this.plano.numberOfInstallments],
            idConsortium    : [this.plano.idConsortium],
            handle : [this.plano.handle],
            registerDate : [this.plano.registerDate],
            canErase : [this.plano.canErase]
        });
       
    }

    
}
