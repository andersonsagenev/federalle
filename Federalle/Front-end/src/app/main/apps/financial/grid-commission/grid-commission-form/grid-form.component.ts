import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { RequestService } from '@fuse/services/request.service';
import { ConfirmService } from '@fuse/services/confirm.service';
import { GridCommissionService } from 'app/main/apps/financial/grid-commission/grid-commission.service';
import { GridCommission } from 'app/main/apps/financial/grid-commission/grid-commission.model';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Consorcio } from "../../../../../models/consorcio";


@Component({
    selector: 'grid-form-dialog',
    templateUrl: './grid-form.component.html',
    styleUrls: ['./grid-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ]
})

export class GridFormDialogComponent {
    _action: string;
    gridCommission: GridCommission;
    consorcios: Consorcio;
    formGridCommission: FormGroup;
    dialogTitle: string;
    companys: any;
    consortia: any
   
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
     * @param {MatDialogRef<GridFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<GridFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) 
        private _data: any,
        private _formBuilder: FormBuilder,
        private _request: RequestService,
        private _router: Router,
        private _alert: ConfirmService,
        private _gridService: GridCommissionService,

    ) {
        // Set the defaults
        this._action = _data.action;
        this._unsubscribeAll = new Subject();

        if (this._action === 'editar') {
            this.dialogTitle = 'Editar Grade de Comissão';
            this.gridCommission = _data.commission;
            console.log('grid que chegou...', this.gridCommission)
        
        }
        else {
            this.dialogTitle = 'Nova Grade de Comissão';
            this.gridCommission = new GridCommission({});
        }

        this.formGridCommission = this.createUserForm();
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
    * On init
    */
    ngOnInit(): void {

        // recuperar dados usuário logado
        this.userLog = localStorage.getItem('user')
        if (this.userLog) {
            
        } else {
            this.logout();
        }

          // dropdown consorcio
          this._gridService.onConsorcioChanged.subscribe(data => {
            this.consorcios = data;
        });
       
    }
    /**
     * Create user form
     *
     * @returns {FormGroup}
     */
    createUserForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.gridCommission.id],
            name: [this.gridCommission.name],
            type: [this.gridCommission.type],
            startDate: [this.gridCommission.startDate],
            idConsortium: [this.gridCommission.idConsortium],
            prompt: [this.gridCommission.prompt],

            idCommissionPayment: [this.gridCommission.idCommissionPayment],
            typeRepresentative: [this.gridCommission.typeRepresentative],
            startAmount: [this.gridCommission.startAmount],
            endAmount: [this.gridCommission.endAmount],
            startNoCompliance : [this.gridCommission.startNoCompliance],
            endNoCompliance: [this.gridCommission.endNoCompliance],
            quota1: [this.gridCommission.quota1],
            quota2: [this.gridCommission.quota2],
            quota3: [this.gridCommission.quota3],
            quota4: [this.gridCommission.quota4],
            quota5: [this.gridCommission.quota5],
            quota6: [this.gridCommission.quota6],
            quota7: [this.gridCommission.quota7],
            quota8: [this.gridCommission.quota8],
            quota9: [this.gridCommission.quota9],
            quota10: [this.gridCommission.quota10],
            quota12: [this.gridCommission.quota12],
            quota13: [this.gridCommission.quota13],
            quota14: [this.gridCommission.quota14],
            quota15: [this.gridCommission.quota15],
            canErase: [this.gridCommission.canErase],
           
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

    logout(): void {
        this._request.server('/api/logout', 'post').subscribe(data => {
            localStorage.removeItem('user');
            this._router.navigate(['/pages/login']);
        }, error => {
            console.log('Error', error)
        })
    }
}


