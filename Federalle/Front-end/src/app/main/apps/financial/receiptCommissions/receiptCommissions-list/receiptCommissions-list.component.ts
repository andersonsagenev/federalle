import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmService } from '@fuse/services/confirm.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { CommissionsFormDialogComponent } from 'app/main/apps/financial/receiptCommissions/receiptCommissions-form/receiptCommissions-form.component';
import { ReceiptCommissionService } from "../receiptCommissions.service";
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
    selector     : 'receiptCommissions-list',
    templateUrl  : './receiptCommissions-list.component.html',
    styleUrls    : ['./receiptCommissions-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ]


})
export class CommissionsListComponent implements OnInit, OnDestroy
{
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;
    
    dataSource: any;
    user: any;
    beneficios: any;
    displayedColumns = [ 'codeBenefit', 'name', 'valueCredit', 'buttons'];
    selectedContacts: any[];
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ReceiptCommissionService} _commissionService
     * @param {MatDialog} _matDialog
     */
    constructor(
        public _matDialog: MatDialog,
        public _confirm: ConfirmService,
        public _commissionService: ReceiptCommissionService
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
        this.dataSource = new FilesDataSource(this._commissionService);

        this._commissionService.onBenefitsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                this.beneficios = data;
            });
       
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
     * Edit Commissions
     *
     * @param commission
     */
    updateCommissions(commission): void
    {
        this.dialogRef = this._matDialog.open(CommissionsFormDialogComponent, {
            panelClass: 'receiptCommissions-form-dialog',
            data      : {
                commission: commission,
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

                    this._commissionService.updateBenefits(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteCommission(commission);

                        break;
                }
            });
    }

    /**
     * Delete Commission
     */
    deleteCommission(commission): void
    { 
        this._confirm.SwalConfirm().then(res => {
            if (res) {
              this._commissionService.deleteBenefits(commission);
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
     * @param {ReceiptCommissionService} _commissionService
     */
    constructor(
        private _commissionService: ReceiptCommissionService
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
        return this._commissionService.onBenefitsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}


  

