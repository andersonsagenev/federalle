import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmService } from '@fuse/services/confirm.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { IndicatorFormDialogComponent } from 'app/main/apps/financial/indicators/form-indicator/form-indicator.component';
import { IndicatorService } from '../indicators.service';

@Component({
    selector     : 'list-indicator',
    templateUrl  : './list-indicator.component.html',
    styleUrls    : ['./list-indicator.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class IndicatorListComponent implements OnInit, OnDestroy
{
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;
    
    dataSource: FilesDataSource | null;
    user: any;
    displayedColumns = [ 'name', 'buttons'];
    selectedContacts: any[];
    dialogRef: any;
    consorcios: any;
    exist: boolean = false;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {IndicatorService} _indicatorService
     * @param {MatDialog} _matDialog
     */
    constructor(
        public _matDialog: MatDialog,
        public _confirm: ConfirmService,
        public _indicatorService: IndicatorService
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
        this.dataSource = new FilesDataSource(this._indicatorService);

        this._indicatorService.onIndicatorChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                this.consorcios = data;
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
     * Edit Indicator
     *
     * @param indicator
     */
    
    updateIndicator(indicator): void
    {
        this.dialogRef = this._matDialog.open(IndicatorFormDialogComponent, {
            panelClass: 'form-indicator-dialog',
            data      : {
                indicator: indicator ,
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

                        this._indicatorService.updateIndicators(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteIndicator(indicator);

                        break;
                }
            });
    }

    /**
     * Delete Form indicator
     */
    deleteIndicator(indicator): void
    { 
        this._confirm.SwalConfirm().then(res => {
            if (res) {
              this._indicatorService.deleteIndicators(indicator);
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
     * @param {IndicatorService} _indicatorService
     */
    constructor(
        private _indicatorService: IndicatorService
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
        return this._indicatorService.onIndicatorChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}


  

