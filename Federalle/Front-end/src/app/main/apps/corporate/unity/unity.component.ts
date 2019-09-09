import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { Subject } from 'rxjs';
import { CepService } from '@fuse/services/cep.service';
import { RequestService } from '@fuse/services/request.service';
import { ConfirmService } from '@fuse/services/confirm.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cep } from '../../../../models/cep';
import { takeUntil } from 'rxjs/internal/operators';
import { locale as english } from 'app/main/apps/corporate/unity//i18n/en';
import { locale as portuguese } from 'app/main/apps/corporate/unity//i18n/pt';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';



@Component({
  selector: 'unity',
  templateUrl: './unity.component.html',
  styleUrls: ['./unity.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
]
})
export class UnityComponent implements OnInit, OnDestroy {

  public maskTelefone = ['+', /[1-9]/, /\d/, ' ', '(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public maskCelular = ['+', /[1-9]/, /\d/, ' ', '(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public cepMask = [/\d/ , /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public cnpjMask = [ /\d/ , /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/ , /\d/, /\d/, '/', /\d/, /\d/,/\d/, /\d/, '-', /\d/, /\d/];
  formPerson: FormGroup;
  customerId: any;
  userLog: any;
  roles: any = [];
  idCompany: any;
  user: any;
  role: any;
  companys: any;
  isLoading: boolean = false;
  _disabled: boolean = false;
  isChecked: boolean = false;
  cep = new Cep()

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private _request: RequestService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _cepService: CepService,
    private _alert: ConfirmService,
  ) {
    // Configure the layout
    this._fuseConfigService.config = {
      layout: {
        footer: {
          hidden: true
        }
      }
    };
    // Set the private defaults
    this._unsubscribeAll = new Subject();
    // Load the translations
    this._fuseTranslationLoaderService.loadTranslations(english, portuguese);

   
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    this.formPerson = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      email1: ['', Validators.email],
      phone: ['', Validators.required],
      type: ['', Validators.required],
      cellphone: [''],
      percent: [''],
      cpfCnpj: ['', Validators.required],
      isActive: [true],
      zip: ['', Validators.maxLength(9)],
      andress: '',
      number: '',
      complement: '',
      district: '',
      city: '',
      uf: '',
     
    });

    // Id params
    this._route.params.subscribe(params => {
      this.customerId = params['id'];
      if (this.customerId != 'new') {
        this.retrieveUsers()
      }
    })

    this.formPerson.controls['type'].setValue('fisica');

     // Id module routeParams
     const routeParams = this._route.snapshot.params;
     if (routeParams && routeParams.company) {
         
    }
    
    // recuperar dados usuário logado
    this.userLog = localStorage.getItem('user')
    if (this.userLog) {
     
    } else {
      this.logout();
    }
    
   
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  onChange(checked){
    console.log('checado ~~>', checked)
    this.isChecked = checked.checked;
  }

  searchCep() {
    this.isLoading = true;
    let cep = this.formPerson.get('zip').value;
    console.log('cep ~~>', cep)
    if (cep != null && cep !== '') {
      this._cepService.buscaCep(cep)
        .subscribe((dt: any) => {
          // console.log('retorno dt', dt)
          if (dt.erro) {
            this.resetaDadosForm()
            this._alert.SwalCleanCep()
            this.isLoading = false;
            return;
          }
          this.populateAddress(dt)
        });
      this.isLoading = false;
    } else {
      this._alert.SwalCleanCep()
      this.isLoading = false;
    }
  }
  populateAddress(item: any) {
    this.formPerson.patchValue({
      
        zip: item.cep,
        andress: item.logradouro,
        complement: item.complemento,
        district: item.bairro,
        city: item.localidade,
        uf: item.uf
      
    })
  }
  resetaDadosForm() {
    this.formPerson.patchValue({
        zip: null,
        andress: null,
        complement: null,
        number: null,
        district: null,
        city: null,
        uf: null
    })
  }
  retrieveUsers() {
    this._request.server('/api/user/' + this.customerId, 'get').subscribe(data => {
      console.log('retrieve usuario', data.data)
      this.user = data.data;
      this.formPerson.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        phone: this.user.phone,
        role: this.user.role.id,
        company: this.user.company.id || null, 
        isActive: this.user.isActive,
        password: this.user.password,
        passwordConfirm: this.user.password,
        address: {
          postalCode: this.user.address.postalCode,
          logradouro: this.user.address.logradouro,
          complement: this.user.address.complement,
          district: this.user.address.district,
          number: this.user.address.number,
          city: this.user.address.city,
          uf: this.user.address.uf
        }
      })
    }, error => {
      console.log('Error', error)
    })
  }
  // Save user
  onSaveAdmin() {
   // this.formPerson.controls['role'].setValue(this.role_admin);
    let requestData = this.formPerson.value;
    requestData.name = this.formPerson.value.firstName + ' ' + this.formPerson.value.lastName
    if (requestData.passwordConfirm) {
      delete requestData.passwordConfirm;
    }
     console.log('Request Person ===>', requestData)
    if (this.formPerson.valid) {
      this._request.server('/api/user', 'post', requestData).subscribe(data => {
        if (data.success === true) {
          console.log('Sucesso! Cadastrado com sucesso')
          this._router.navigate(['/apps/people/users']);
          this._alert.SwalInsert();
        }else{
          console.log( 'erro', data.message)
          this._alert.SwalError('Login já cadastrado', data.message);
        }
      }, error => {
        console.log('erro', error)
      })
    }
  }
  //Update user
  onEditAdmin() {
    //this.formPerson.controls['role'].setValue(this.role_admin);
    let requestData = this.formPerson.value;
    requestData.name = this.formPerson.value.firstName + ' ' + this.formPerson.value.lastName
    if (requestData.password) {
      delete requestData.password;
    }
    if (requestData.passwordConfirm) {
      delete requestData.passwordConfirm;
    }
    this._request.server('/api/user/' + this.customerId, 'put', requestData).subscribe(data => {
      if (data.success === true) {
        this._alert.SwalUpdate();
        this._router.navigate(['/apps/people/users']);
      } else{
        this._alert.SwalError();
      }
    }, error => {
      this._alert.SwalError();
      console.log('Error', error)
    })
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
