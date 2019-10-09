import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { RequestService } from '@fuse/services/request.service';
import { ConfirmService } from '@fuse/services/confirm.service';
import { BankAccountService } from 'app/main/apps/financial/bank-account/bank-account.service';
import { BankAccount } from 'app/main/apps/financial/bank-account/bank-account.model';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Unity } from "../../../../../models/unity";
import { Banks } from "../../../../../models/banks";


@Component({
    selector: 'bank-account-form-dialog',
    templateUrl: './bank-account-form.component.html',
    styleUrls: ['./bank-account-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ]
})

export class BankAccountFormDialogComponent {
    _action: string;
    bankAccount: BankAccount;
    typeAccounts: Unity;
    statusAccounts: Unity;
    unities: Unity;
    banks: Banks;
    formBankAccount: FormGroup;
    dialogTitle: string;
    consortia: any;
    userLog: any;
    _disabled: boolean = false;
    showExtraToFields: boolean;
   

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MatDialogRef<BankAccountFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<BankAccountFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) 
        private _data: any,
        private _formBuilder: FormBuilder,
        private _request: RequestService,
        private _router: Router,
        private _alert: ConfirmService,
        private _bankAccountFormService: BankAccountService,

    ) {
        // Set the defaults
        this._action = _data.action;
        this._unsubscribeAll = new Subject();
        this.showExtraToFields = false;

        if (this._action === 'editar') {
            this.dialogTitle = 'Editar Conta Bancária';
            this.bankAccount = _data.commission;
            console.log('conta que chegou...', this.bankAccount)
        
        }
        else {
            this.dialogTitle = 'Nova Conta Bancária';
            this.bankAccount = new BankAccount({});
        }

        this.formBankAccount = this.createBankAccountForm();
        
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

          // dropdown unidades
          this._bankAccountFormService.onUnitiesChanged.subscribe(data => {
            this.unities = data;
        });
          // dropdown banks
          this._bankAccountFormService.onBanksChanged.subscribe(data => {
            this.banks = data;
        });
       
    }
    /**
     * Create Bank Account
     *
     * @returns {FormGroup}
     */
    createBankAccountForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.bankAccount.id],
            name: [this.bankAccount.name],
            typeAccount: [this.bankAccount.typeAccount],
            statusAccount: [this.bankAccount.statusAccount],
            closingDate: [this.bankAccount.closingDate],
            openDate: [this.bankAccount.openDate],
            limit: [this.bankAccount.limit],
            treasuryCredit: [this.bankAccount.treasuryCredit],
            treasuryDebit: [this.bankAccount.treasuryDebit],
            accountingAccount: [this.bankAccount.accountingAccount],

            idBank: [this.bankAccount.idBank],
            idUnity: [this.bankAccount.idUnity],
            agency: [this.bankAccount.agency],
            dvAgency: [this.bankAccount.dvAgency],
            active: [this.bankAccount.active],
            account: [this.bankAccount.account],
            dvAccount: [this.bankAccount.dvAccount],
            wallet: [this.bankAccount.wallet],
            nextOurNumber : [this.bankAccount.nextOurNumber],
            codeAssignor: [this.bankAccount.codeAssignor],
            operation: [this.bankAccount.operation],
            dvAssignor: [this.bankAccount.dvAssignor],
            interest: [this.bankAccount.interest],
            fine: [this.bankAccount.fine],
            bank: [this.bankAccount.bank],
            unity: [this.bankAccount.unity],
            used: [this.bankAccount.used],
            instructionPayment1: [this.bankAccount.instructionPayment1],
            instructionPayment2: [this.bankAccount.instructionPayment2],
            instructionPayment3: [this.bankAccount.instructionPayment3],
            instructionPayment4: [this.bankAccount.instructionPayment4],
            instructionPayment5: [this.bankAccount.instructionPayment5],
            canErase: [this.bankAccount.canErase],
           
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

    /**
     * Toggle extra to fields
     */
    toggleExtraToFields(): void
    {
        this.showExtraToFields = !this.showExtraToFields;
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


