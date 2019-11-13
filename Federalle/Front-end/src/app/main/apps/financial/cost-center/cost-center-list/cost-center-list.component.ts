import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmService } from '@fuse/services/confirm.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { CostCenterFormDialogComponent } from 'app/main/apps/financial/cost-center/cost-center-form/cost-center-form.component';
import { CostCenterService } from '../cost-center.service';

@Component({
    selector     : 'cost-center-list',
    templateUrl  : './cost-center-list.component.html',
    styleUrls    : ['./cost-center-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class CostCenterListComponent implements OnInit, OnDestroy
{
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;
    
    dataSource: FilesDataSource | null;
    user: any;
    displayedColumns = [ 'name', 'buttons'];
    selectedContacts: any[];
    dialogRef: any;
    costs: any;
    exist: boolean = false;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CostCenterService} _costCenterService
     * @param {MatDialog} _matDialog
     */
    constructor(
        public _matDialog: MatDialog,
        public _confirm: ConfirmService,
        public _costCenterService: CostCenterService
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
        this.dataSource = new FilesDataSource(this._costCenterService);

        this._costCenterService.onCostCenterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                this.costs = data;
                console.log('Centro de Custos', this.costs)
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
     * Edit Cost Center
     *
     * @param cost center
     */
    updateCostCenter(cost): void
    {
        this.dialogRef = this._matDialog.open(CostCenterFormDialogComponent, {
            panelClass: 'cost-center-form-dialog',
            data      : {
                costs: cost,
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

                        this._costCenterService.updateCostCenter(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteCostCenter(status);

                        break;
                }
            });
    }

    /**
     * Delete Cost Center
     */
    deleteCostCenter(payment): void
    { 
        this._confirm.SwalConfirm().then(res => {
            if (res) {
              this._costCenterService.deleteCentroCusto(payment);
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
     * @param {PaymentService} _costCenterService
     */
    constructor(
        private _costCenterService: CostCenterService
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
        return this._costCenterService.onCostCenterChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}


  

