import { Component, OnDestroy, OnInit, TemplateRef,ElementRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSort, MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';
import { RequestService } from '@fuse/services/request.service';
import { ConfirmService } from '@fuse/services/confirm.service';
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { BankAccountService } from 'app/main/apps/financial/bank-account/bank-account.service';
import { BankAccountFormDialogComponent } from 'app/main/apps/financial/bank-account/bank-account-form/bank-account-form.component';


@Component({
    selector: 'bank-account',
    templateUrl: './bank-account.component.html',
    styleUrls: ['./bank-account.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BankAccountComponent implements OnInit, OnDestroy {
    @ViewChild('dialogContent')
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild("myElem") MyProp :ElementRef;

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    displayedColumns: string[] = ['name', 'buttons'];
    // displayedColumns: string[] = ['name', 'type', 'consortium', 'installments', 'buttons'];
    dataSource: any;
    dialogContent: TemplateRef<any>;
    dialogRef: any;
    hasSelectedStudents: boolean;
    searchInput: FormControl;
    commissions: any;

    user: any;
    selectedContacts: any[];
    selectedStudent: any = [];
    //pagination
    limit = 30;
    index = 1;
    page: any;
    pages = [];
    numPages: any;
    page_number: any;
    total: number;
    companyId: any;
    userLog: any;
    _disabled: boolean = false;
    exist: boolean = false;
    hide: boolean = true;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param { BankAccountService } _bankAccountService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _bankAccountService: BankAccountService,
        private _fuseSidebarService: FuseSidebarService,
        public _matDialog: MatDialog,
        private _request: RequestService,
        private _confirm: ConfirmService,
        private _router: Router,
        private _alert: ConfirmService
    ) {
        // Set the defaults
        this.searchInput = new FormControl('');
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.userLog = localStorage.getItem('user')
        if (this.userLog) {
           
        } else {
            this.logout();
        }

        this._bankAccountService.onBankAccountChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                console.log('retorno de grade ~~>', data)
                if(data.length){
                    this.exist = true;
                this.commissions = data
                }else{
                    this.exist = false;
                }
            });
            this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this._bankAccountService.onSearchTextChanged.next(searchText);
            });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
    * Edit Grade Comissao 
    *
    * @param grade
    */
    editGridCommission(grade: any): void {
        console.log('grade para update', grade)
        this.dialogRef = this._matDialog.open(BankAccountFormDialogComponent, {
            panelClass: 'grid-form-dialog',
            data: {
                commission: grade,
                action: 'editar'
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch (actionType) {
                    /**
                     * Update
                     */
                    case 'save':
                        console.log('grade para update...', formData.getRawValue())
                        this._bankAccountService.updateGridCommission(response.getRawValue());
                        break;
                    /**
                     * Delete
                     */
                    case 'delete':
                        this.ConfirmDelete(grade);
                        break;
                }
            });
    }

    /**
    * New Bank Account
    */
   newBankAccount(): void {
        this.dialogRef = this._matDialog.open(BankAccountFormDialogComponent, {
            panelClass: 'bank-account-form-dialog',
            data: {
                action: 'new',
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                this._bankAccountService.addGridCommission(response.getRawValue());
            });
    }

   /**
     * Delete Grid Commission
     */
    ConfirmDelete(grid): void
    { 
        this._confirm.SwalConfirm().then(res => {
            if (res) {
              this._bankAccountService.deleteGridCommission(grid);
            }
          }).catch(err => {
            console.log('Error', err)
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

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
