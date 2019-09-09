import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmService } from '@fuse/services/confirm.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { BankFormDialogComponent } from 'app/main/apps/corporate/banks/banks-form/banks-form.component';
import { BanksService } from '../banks.service';

@Component({
    selector     : 'banks-list',
    templateUrl  : './banks-list.component.html',
    styleUrls    : ['./banks-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class BanksListComponent implements OnInit, OnDestroy
{
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;
    
    dataSource: FilesDataSource | null;
    user: any;
    displayedColumns = [ 'codeFebraban','name','buttons'];
    selectedContacts: any[];
    dialogRef: any;
    banks: any;
    exist: boolean = false;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {BanksService} _bankService
     * @param {MatDialog} _matDialog
     */
    constructor(
        public _matDialog: MatDialog,
        public _confirm: ConfirmService,
        public _bankService: BanksService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
       
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.dataSource = new FilesDataSource(this._bankService);

        this._bankService.onBankChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                this.banks = data;
        });

            console.log('lista de bancos', this.banks)
            console.log('lista de bancos', this.dataSource)
       
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Edit Banks
     *
     * @param Banks
     */
    updateBank(bank): void
    {
        this.dialogRef = this._matDialog.open(BankFormDialogComponent, {
            panelClass: 'banks-form-dialog',
            data      : {
                banks: bank,
                action : 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    /**
                     * Save
                     */
                    case 'save':

                        this._bankService.updateBank(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteBank(bank);

                        break;
                }
            });
    }

    /**
     * Delete Bank
     */
    deleteBank(bank): void
    { 
        this._confirm.SwalConfirm().then(res => {
            if (res) {
              this._bankService.deleteBank(bank);
              console.log('Deletou o id', res)
            }
          }).catch(err => {
            console.log('Error', err)
          })

    }
  
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {BanksService} _bankService
     */
    constructor(
        private _bankService: BanksService
    )
    {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this._bankService.onBankChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}


  

