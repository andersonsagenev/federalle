import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmService } from '@fuse/services/confirm.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { StatusFormDialogComponent } from 'app/main/apps/contract/status-contract/form-status/form-status.component';
import { StatusService } from '../status.service';

@Component({
    selector     : 'status-list',
    templateUrl  : './status-list.component.html',
    styleUrls    : ['./status-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class StatusListComponent implements OnInit, OnDestroy
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
     * @param {StatusService} _statusService
     * @param {MatDialog} _matDialog
     */
    constructor(
        public _matDialog: MatDialog,
        public _confirm: ConfirmService,
        public _statusService: StatusService
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
        this.dataSource = new FilesDataSource(this._statusService);

        this._statusService.onStatusChanged
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
     * Edit Status Contract
     *
     * @param status
     */
    updateStatus(status): void
    {
        this.dialogRef = this._matDialog.open(StatusFormDialogComponent, {
            panelClass: 'form-status-dialog',
            data      : {
                status: status,
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

                        this._statusService.updateStatus(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteStatus(status);

                        break;
                }
            });
    }

    /**
     * Delete Status Contract
     */
    deleteStatus(status): void
    { 
        this._confirm.SwalConfirm().then(res => {
            if (res) {
              this._statusService.deleteStatus(status);
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
     * @param {StatusService} _statusService
     */
    constructor(
        private _statusService: StatusService
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
        return this._statusService.onStatusChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}


  

