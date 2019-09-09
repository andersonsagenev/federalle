import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { takeUntil } from 'rxjs/internal/operators';
import { Subject } from 'rxjs';
import { RequestService } from '@fuse/services/request.service';
import { ConfirmService } from '@fuse/services/confirm.service';


@Component({
    selector     : 'contacts-contact-form-dialog',
    templateUrl  : './reset-form.component.html',
    styleUrls    : ['./reset-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class resetFormDialogComponent
{
    urlAvatar = 'http://186.202.182.7:6100/images/avatar/'
    action: string;
    user: any;
    objUser: any;
    contactForm: FormGroup;
    dialogTitle: string;

       // Private
       private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MatDialogRef<resetFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<resetFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _request: RequestService,
        private _alert: ConfirmService,
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'reset' )
        {
            this.dialogTitle = 'Alteração de Senha';
            this.user = _data.user;
        }
        else
        {
            this.dialogTitle = 'Nova Senha';
            
        }

       // this.contactForm = this.createContactForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void
    {
        // Reactive Form
        this.contactForm = this._formBuilder.group({
            password       : ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });
        this.contactForm.get('password').valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(() => {
          this.contactForm.get('passwordConfirm').updateValueAndValidity();
        });

        
    }
     // Retrieve user
     retrieveUsers() {
        console.log('entoru no retrieve >>>>>>>>>>>>>')
        this._request.server('user/' + this.user, 'get').subscribe(data => {
            console.log('retrieve usuario', data.data)
            this.objUser = data.data;
           
        }, error => {
            console.log('Error', error)
        })
    }
  
}

/**
* Confirm password validator
*
* @param {AbstractControl} control
* @returns {ValidationErrors | null}
*/
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
      return null;
    }
  
    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');
  
    if (!password || !passwordConfirm) {
      return null;
    }
  
    if (passwordConfirm.value === '') {
      return null;
    }
  
    if (password.value === passwordConfirm.value) {
      return null;
    }
  
    return { 'passwordsNotMatching': true };
  };
