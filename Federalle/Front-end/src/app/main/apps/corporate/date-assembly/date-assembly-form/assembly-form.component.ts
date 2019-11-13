import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Assembly } from 'app/main/apps/corporate/date-assembly/date-assembly.model';

@Component({
    selector     : 'date-assembly-form-dialog',
    templateUrl  : './assembly-form.component.html',
    styleUrls    : ['./assembly-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AssemblyFormDialogComponent
{
    action: string;
    contact: Assembly;
    contactForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<AssemblyFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<AssemblyFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Edit Contact';
            this.contact = _data.contact;
        }
        else
        {
            this.dialogTitle = 'New Contact';
            this.contact = new Assembly({});
        }

        this.contactForm = this.createContactForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createContactForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.contact.id],
            name    : [this.contact.name],
            lastName: [this.contact.lastName],
            avatar  : [this.contact.avatar],
            nickname: [this.contact.nickname],
            company : [this.contact.company],
            jobTitle: [this.contact.jobTitle],
            email   : [this.contact.email],
            phone   : [this.contact.phone],
            address : [this.contact.address],
            birthday: [this.contact.birthday],
            notes   : [this.contact.notes]
        });
    }
}
