import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { VerificationService } from "../verification.service";
import { Verification } from 'app/main/apps/corporate/verification/verification.model';

@Component({
    selector     : 'verification-form-dialog',
    templateUrl  : './verification-form.component.html',
    styleUrls    : ['./verification-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class VerificationFormDialogComponent
{
    action: string;
    verification: Verification;
    verificationForm: FormGroup;
    dialogTitle: string;
    sectors: any;

    /**
     * Constructor
     *
     * @param {MatDialogRef<VerificationFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<VerificationFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        public _verificationService: VerificationService
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Editar Verificação';
            this.verification = _data.verification;
        }
        else
        {
            this.dialogTitle = 'Nova Verificação';
            this.verification = new Verification({});
        }

        this.verificationForm = this.createVerificationForm();
    }

     /**
     * On init
     */
    ngOnInit(): void
    {
        // dropdown verificatons
        this._verificationService.onSectorChanged.subscribe(data => {
                this.sectors = data;
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create verification form
     *
     * @returns {FormGroup}
     */
    createVerificationForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.verification.id],
            name    : [this.verification.name],
            idSector    : [this.verification.idSector],
            handle : [this.verification.handle],
            canErase : [this.verification.canErase]
        });
       
    }

    
}
