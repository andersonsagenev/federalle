import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { RequestService } from '@fuse/services/request.service';
import { ConfirmService } from '@fuse/services/confirm.service';
import { UserService } from '../users.service';
import { User } from 'app/main/apps/users/users.model';
import { Sector } from 'app/main/apps/corporate/sector/sector.model';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MK_API } from "app/app.api";
import { MK_TOKEN } from "app/app.token";

const headers = new HttpHeaders({
    Authorization: "Basic " + localStorage.getItem("user"),
    "x-api-key": MK_TOKEN
});


@Component({
    selector: 'user-form-dialog',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ]
})

export class UserFormDialogComponent {
    _action: string;
    user: User;
    setores: Sector;
    formUser: FormGroup;
    dialogTitle: string;
    companys: any;
    employees: any
   
    userLog: any;
    idCompany: any;
    idStudent: any;
    role: any;
    _disabled: boolean = false;
   

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MatDialogRef<UserFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<UserFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) 
        private _data: any,
        private _formBuilder: FormBuilder,
        private _request: RequestService,
        private _router: Router,
        private _alert: ConfirmService,
        private _userService: UserService,
        private _httpClient: HttpClient,

    ) {
        // Set the defaults
        this._action = _data.action;
        this._unsubscribeAll = new Subject();

        if (this._action === 'editar') {
            this.dialogTitle = 'Editar Usuário';
            this.user = _data.person;
            console.log('usuario que chegou...', this.user)
        
        }
        else {
            this.dialogTitle = 'Novo Usuário';
            this.user = new User({});
        }

        this.formUser = this.createUserForm();
        this.formUser.get('password').valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(() => {
            this.formUser.get('passwordConfirm').updateValueAndValidity();
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
    * On init
    */
    ngOnInit(): void {

        this.formUser.controls['idSector'].setValue('');

        // recuperar dados usuário logado
        this.userLog = localStorage.getItem('user')
        if (this.userLog) {
            
        } else {
            this.logout();
        }

          // dropdown setores
          this._userService.onSectorChanged.subscribe(data => {
            this.setores = data;
        });
       
    }
    /**
     * Create user form
     *
     * @returns {FormGroup}
     */
    createUserForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.user.id],
            name: [this.user.name],
            idResentante: [this.user.idResentante],
            idSector: [this.user.idSector],
            login: [this.user.login],
            deadlinePassword : [this.user.deadlinePassword],
            type: [this.user.type],
            email: [this.user.email || ''],
            password: [this.user.password, Validators.required],
            passwordConfirm: [this.user.password, [Validators.required, confirmPasswordValidator]],
        });
    }

    /**
    * On destroy
    */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // saveUsers(): Promise<any> {

    //     console.log('this.formUser', this.formUser.value)
    //     this.formUser.controls['name'].setValue(this.formUser.value.name);
    //     let requestData = this.formUser.value;
        
    //     if (requestData.passwordConfirm) {
    //         delete requestData.passwordConfirm;
    //     }
    //     if (!requestData.idResentante) {
    //         delete requestData.idResentante;
    //     }

    //     return new Promise((resolve, reject) => {
    //         this._httpClient
    //             .post(MK_API + '/api/Users', requestData, {
    //                 headers: headers
    //             })
    //             .subscribe((response: any) => {
    //                 this._alert.SwalInsert()
    //                 this.getBanks();
    //                 resolve(response);
    //             }, reject);
    //     });
    // }
    
    saveStudent() {
        console.log('this.formUser', this.formUser.value)
        this.formUser.controls['name'].setValue(this.formUser.value.name);
        let requestData = this.formUser.value;
        
        if (requestData.passwordConfirm) {
            delete requestData.passwordConfirm;
        }
        if (!requestData.idResentante) {
            delete requestData.idResentante;
        }
        if (this.formUser.valid) {
            console.log('form user submitted', requestData);
            this._httpClient
                .post( MK_API + '/api/Users', requestData,  { headers: headers }).subscribe(data => {
                console.log('retorno data', data)
                if (data) {
                    console.log('Retorno', data)
                    this.matDialogRef.close(['new'])
                    this._alert.SwalInsert()
                } else {
                    this.matDialogRef.close()
                    this._alert.SwalError()
                }
            }, error => {
                console.log('Error', error)
            })
        }
    }

    

    logout(): void {
        this._request.server('/api/logout', 'post').subscribe(data => {
            localStorage.removeItem('user');
            this._router.navigate(['/pages/login']);
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
