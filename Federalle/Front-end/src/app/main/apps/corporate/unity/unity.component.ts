import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { Subject } from 'rxjs';
import { CepService } from '@fuse/services/cep.service';
import { RequestService } from '@fuse/services/request.service';
import { ConfirmService } from '@fuse/services/confirm.service';
import { UnityService } from './unity.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cep } from '../../../../models/cep';
import { takeUntil } from 'rxjs/internal/operators';
import { locale as english } from 'app/main/apps/corporate/unity//i18n/en';
import { locale as portuguese } from 'app/main/apps/corporate/unity//i18n/pt';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
<<<<<<< HEAD
import { FuseUtils } from '@fuse/utils';

=======
import { UnityService } from "../unity/unity.service";
>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f


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
<<<<<<< HEAD
  public cepMask = [/\d/ , /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public cnpjMask = [ /\d/ , /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/ , /\d/, /\d/, '/', /\d/, /\d/,/\d/, /\d/, '-', /\d/, /\d/];
  formUnity: FormGroup;
  customerId: any;
=======
  public cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public cnpjMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  formUnity: FormGroup;
  unityId: any;
>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f
  userLog: any;
  roles: any = [];
  idCompany: any;
  user: any;
  role: any;
<<<<<<< HEAD
  units: any;
=======
  companys: any;
>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f
  estados: any;
  cidades: any;
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
<<<<<<< HEAD
    private _unityService: UnityService,
=======
    public _unityService: UnityService,
>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f
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

<<<<<<< HEAD
     // dropdown estados
     this._unityService.onUfsChanged.subscribe(data => {
      this.estados = data;
  });
  // dropdown cidades
  this._unityService.onCitysChanged.subscribe(data => {
      this.cidades = data;
  });
=======
    // dropdown estados
    this._unityService.onUfsChanged.subscribe(data => {
      this.estados = data;
    });
    // dropdown cidades
    // this._unityService.onCitysChanged.subscribe(data => {
    //     this.cidades = data;
    // });
>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f

    this.formUnity = this._formBuilder.group({
      name: ['', Validators.required],
      email1: ['', Validators.required, Validators.email],
      email2: ['', Validators.email],
      telefone1: ['', Validators.required],
      telefone2: [''],
      im: [''],
<<<<<<< HEAD
      regime: [''],
      percent: [''],
      cnpj: ['', Validators.required],
      active: [true],
      cep: ['', Validators.maxLength(9)],
      natureOperation: [''],
      andress: [''],
      number: [''],
      complement: [''],
      district: [''],
      idCity: [null],
      idUf: [null],
     
=======
      registerDate: [''],
      type: ['', Validators.required],
      percentage: [''],
      cnpj: ['', Validators.required],
      withholdTaxes: [''],
      isActive: [true],
      cep: ['', Validators.maxLength(9)],
      andress: '',
      number: '',
      complement: '',
      district: '',
      idCity: '',
      idUf: '',

>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f
    });

    // Id params
    this._route.params.subscribe(params => {
      this.unityId = params['id'];
      if (this.unityId != 'new') {
        this.retrieveUsers()
      }
    })

<<<<<<< HEAD
     // Id module routeParams
     const routeParams = this._route.snapshot.params;
     if (routeParams && routeParams.company) {
         
=======
    // Id module routeParams
    const routeParams = this._route.snapshot.params;
    if (routeParams && routeParams.company) {

>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f
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

  onChange(checked) {
    console.log('checado ~~>', checked)
    this.isChecked = checked.checked;
  }

<<<<<<< HEAD
   /**
     * Create Unity form
     *
     * @returns {FormGroup}
     */
    createUnityForm(): FormGroup {
      return this._formBuilder.group({
          id: [this.units.id],
          name: [this.units.name],
          handle: [this.units.handle],
          idCity: [this.units.idCity],
          idUf: [this.units.idUf],
          cnpj: [this.units.cnpj],
          registerDate: [this.units.registerDate],
          telefone1: [this.units.telefone1],
          telefone2: [this.units.telefone2],
          im: [this.units.im],
          email1: [this.units.email1],
          email2: [this.units.email2],
          natureOperation: [this.units.natureOperation],
          regime: [this.units.regime],
          cep: [this.units.cep],
          andress: [this.units.andress],
          number: [this.units.number],
          complement: [this.units.complement],
          district: [this.units.district]
      });
  }

=======
  getCidades(item) {
    console.log('id estado ~~>', item.value)
    this._unityService.getCitys(item.value).then(() => {

      this._unityService.onCitysChanged.subscribe(data => {
        this.cidades = data;
      });


    });

  }



>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f
  searchCep() {
    this.isLoading = true;
    let cep = this.formUnity.get('cep').value;
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
    this.formUnity.patchValue({
<<<<<<< HEAD
        cep: item.cep,
        andress: item.logradouro,
        complement: item.complemento,
        district: item.bairro
=======

      zip: item.cep,
      andress: item.logradouro,
      complement: item.complemento,
      district: item.bairro
>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f
    })
  }

  resetaDadosForm() {
    this.formUnity.patchValue({
<<<<<<< HEAD
        cep: null,
        andress: null,
        complement: null,
        number: null,
        district: null
=======
      zip: null,
      andress: null,
      complement: null,
      number: null,
      district: null
>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f
    })
  }

  retrieveUsers() {
    this._request.server('/api/user/' + this.unityId, 'get').subscribe(data => {
      console.log('retrieve usuario', data.data)
      this.user = data.data;
      this.formUnity.patchValue({
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
<<<<<<< HEAD
  // Save Unity
  onSaveUnity() {
    const data = this.formUnity.getRawValue();
    data.handle = FuseUtils.handleize(data.name);
    
    if(data.idCity == ""){
      data.idCity = null;
    }
    if(data.idUf == ""){
      data.idUf = null;
    }
    console.log('rormulario', data)

    this._unityService.addUnity(data).then(() => {
       
        this._unityService.onUnityChanged.next(data);

        this._alert.SwalInsert();
        this._router.navigate(["/apps/corporate/units"]);
      
    });
}
//Update Unity
onEditUnity() {

  const data = this.formUnity.getRawValue();
  data.handle = FuseUtils.handleize(data.name);

  this._unityService.saveUnity(data).then(() => {
     
=======

  // Save Unity
  onSaveUnit() {
    const data = this.formUnity.getRawValue();

    if (data.idCity == "") {
      data.idCity = null;
    }
    if (data.idUf == "") {
      data.idUf = null;
    }
    console.log('formulario', data)

    this._unityService.addUnity(data).then(() => {

      this._unityService.onUnityChanged.next(data);

      this._alert.SwalInsert();
      this._router.navigate(["/apps/corporate/units"]);

    });
  }
  //Update Unity
  onEditUnit() {
    const data = this.formUnity.getRawValue();

    this._unityService.saveUnity(data).then(() => {

>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f
      this._unityService.onUnityChanged.next(data);

      this._alert.SwalInsert();
      this._router.navigate(["/apps/corporate/units"]);
<<<<<<< HEAD
})
}
=======
    })
  }
>>>>>>> 669a35a40164498ff56dcde7ae3bdf7db2b9c76f


  logout(): void {
    this._request.server('/api/logout', 'post').subscribe(data => {
      localStorage.removeItem('user');
      this._router.navigate(['/pages/login']);
    }, error => {
      console.log('Error', error)
    })
  }
}
