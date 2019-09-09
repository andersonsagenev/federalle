import { Component, OnDestroy, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '@fuse/services/request.service';
import { ConfirmService } from '@fuse/services/confirm.service';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { LyTheme2 } from '@alyle/ui';
import { ImgCropperConfig, LyResizingCroppingImages } from '@alyle/ui/resizing-cropping-images';
import { User } from 'app/models/user';
import { fuseAnimations } from '@fuse/animations';
import { locale as english } from 'app/main//pages/profile//i18n/en';
import { locale as portuguese } from 'app/main/pages/profile//i18n/pt';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { CepService } from '@fuse/services/cep.service';
import { Cep } from '../../../models/cep';
import { MatDialog } from '@angular/material';
import { resetFormDialogComponent } from 'app/main/pages/profile/reset-form/reset-form.component';
import { ProfileService } from './profile.service';

const styles = {
    actions: {
        display: 'flex'
    },
    cropping: {
        maxWidth: '400px',
        height: '300px'
    },
    croppingU: {
        maxWidth: '400px',
        height: '300px'
    },
    flex: {
        flex: 1
    }
};

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {
    dialogRef: any;
    getBackUrl;
    form: FormGroup;
    profileForm: FormGroup;
    resetpassword: FormGroup;
    idUser: any;
    user: any;
    companys: any;
    cep = new Cep()
    hide: boolean = false;
    isLoading: boolean = false;
    urlAvatar = 'http://191.252.3.20:1340/images/avatar/'
    pageType: string;

    classes = this._theme.addStyleSheet(styles);
    croppedImage?: string;
    croppedImageUser?: string;

    @ViewChild(LyResizingCroppingImages) img: LyResizingCroppingImages;
    result: string;
    myConfig: ImgCropperConfig = {
        //autoCrop: true,
        width: 150, // Default `250`
        height: 150, // Default `200`
        output: {
            width: 200,
            height: 200
        }
    };
    onCroppedUser(e) {
        // this._serviceProgress.show();
        this.croppedImage = e.dataURL;
        this.profile.photo = e.dataURL;
        this._Service.saveuserPhoto(this.profile.id, this.profile)
            .then(() => {
                // this._serviceProgress.hide();


                // Show the success message
                // this._matSnackBar.open('Registro salvo com sucesso!', 'OK', {
                //     verticalPosition: 'top',
                //     duration: 2000
                // });
                //this.router.navigate(['/pages/profile']);
            });
    }

    profile: User;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _router: Router,
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _request: RequestService,
        private _route: ActivatedRoute,
        private _cepService: CepService,
        private _alert: ConfirmService,
        private _matDialog: MatDialog,
        private _Service: ProfileService,
        private _theme: LyTheme2,

    ) {
        this.profile = new User();
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        // Load the translations
        this._fuseTranslationLoaderService.loadTranslations(english, portuguese);
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                footer: {
                    hidden: true
                },
            }
        };
    }

    /**
     * On init
     */
    ngOnInit(): void {

         // Reactive Form
         this.form = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            postalCode: ['', Validators.maxLength(9)],
            password: [''],
            passwordConfirm: ['', [confirmPasswordValidator]],
            phone: [''],
            isActive: [true],
            address: this._formBuilder.group({
                logradouro: '',
                number: '',
                complement: '',
                district: '',
                city: '',
                uf: '',
                postalCode: '',
            }),
        });
        this.form.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.form.get('passwordConfirm').updateValueAndValidity();
            });

        this._route.params.subscribe(params => {
            this.idUser = params['id'];
            console.log('Id usuario', this.idUser)
            if (this.idUser) {
                //this.retrieveUsers()
            }
        })

        this._Service.userOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                if (data) {
                    this.profile = new User(data);
                    console.log('Retrieve do User', this.profile)
                    //this.pageType = 'edit';
                    this.form.patchValue({
                        name: this.profile.name,
                        email: this.profile.email,
                        // phone: this.profile.phone,
                        // isActive: this.profile.isActive,
                        address: {
                            // postalCode: this.profile.address.postalCode,
                            // logradouro: this.profile.address.logradouro,
                            // complement: this.profile.address.complement,
                            // district: this.profile.address.district,
                            // number: this.profile.address.number,
                            // city: this.profile.address.city,
                            // uf: this.profile.address.uf
                        }
                    })
                } else{
                    this.pageType = 'new';
                    this.profile = new User();

                }
               // this.profileForm = this.updateUserForm();
               // this.resetpassword = this.resetPasswordForm();
            });

           

           // this.productForm = this.createProductForm();

        this.getBackUrl = this._request.getBackUrl();
       
    }


    /**
     * Create user form
     *
     * @returns {FormGroup}
     */
    updateUserForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.profile.id],
            name: [this.profile.name],
            email: [this.profile.email],
            login: [this.profile.login],
            password: [this.profile.password],
            photo: [this.profile.photo],
        });
    }

    resetPasswordForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.profile.id, Validators.required],
            name: [this.profile.name, Validators.required],
            email: [this.profile.login, [Validators.required, Validators.email]],
            password: ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });
    }

    searchCep() {
        this.isLoading = true;
        let cep = this.form.get('address.postalCode').value;
        if (cep != null && cep !== '') {
            this._cepService.buscaCep(cep)
                .subscribe((dt: any) => {
                    console.log('retorno dt', dt)
                    if (dt.erro) {
                        this.isLoading = false;
                        return;
                    }
                    this.populateAddress(dt)
                });
            this.isLoading = false;
        }
    }
    // Preencher campo Address
    populateAddress(item) {
        console.log('retorno cep', item)
        this.form.patchValue({
            address: {
                postalCode: item.cep,
                logradouro: item.logradouro,
                complement: item.complemento,
                district: item.bairro,
                city: item.localidade,
                uf: item.uf
            }
        })
    }

    goBack() {
        if (!this.getBackUrl) {
            this.getBackUrl = '/apps/dashboard'
        }
        this._router.navigate([this.getBackUrl]);
    }

    // Retrieve user
    // retrieveUsers() {
    //     console.log('entoru no retrieve >>>>>>>>>>>>>')
    //     this._request.server('/api/user/' + this.idUser, 'get').subscribe(data => {
    //         console.log('retrieve usuario', data.data)
    //         this.user = data.data;
    //         this.form.patchValue({
    //             firstName: this.user.firstName,
    //             lastName: this.user.lastName,
    //             email: this.user.email,
    //             phone: this.user.phone,
    //             company: this.user.company.id,
    //             isActive: this.user.isActive,

    //             address: {
    //                 postalCode: this.user.address.postalCode,
    //                 logradouro: this.user.address.logradouro,
    //                 complement: this.user.address.complement,
    //                 district: this.user.address.district,
    //                 number: this.user.address.number,
    //                 city: this.user.address.city,
    //                 uf: this.user.address.uf
    //             }
    //         })
    //     }, error => {
    //         console.log('Error', error)
    //     })
    // }

    //Update user
    onEdit() {
        this.isLoading = true;
        console.log('Formulario user..', this.form.value)
        this.form.controls['name'].setValue(this.form.value.firstName + ' ' + this.form.value.lastName);
        let requestData = this.form.value;

        if (!requestData.password) {
            delete requestData.password;
        }
        if (requestData.passwordConfirm) {
            delete requestData.passwordConfirm;
        }

        this._request.server('/api/user/' + this.idUser, 'put', requestData).subscribe(data => {
            if (data.success === true) {
                this._alert.SwalInsert();
                setTimeout(() => {
                    this._router.navigate(['/apps/dashboards/project']);
                    this.isLoading = false;
                }, 1000)
            } else {
                this._alert.SwalError();
                this.isLoading = false;
            }
        }, error => {
            this.isLoading = false;
            console.log('Error', error)
        })
    }
    /**
    * On destroy
    */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
   * New contact
   */
    resetPassword(): void {
        this.dialogRef = this._matDialog.open(resetFormDialogComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'reset',
                user: this.idUser
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                console.log('retorno reset', response.getRawValue())
                this.updatePassword(response.getRawValue())
            });
    }

    // Retrieve user
    updatePassword(response) {
        let requestData = response
        if (requestData.passwordConfirm) {
            delete requestData.passwordConfirm
        }
        console.log('update password >>>>>>>>>>>>>', requestData)
        this._request.server('/api/user/' + this.idUser, 'put', requestData).subscribe(data => {
            console.log('retorno usuario', data)
            if (data.success) {
                this._alert.SwalMessage('success', 'Sucesso', 'Senha alterada com sucesso!')
            }
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
