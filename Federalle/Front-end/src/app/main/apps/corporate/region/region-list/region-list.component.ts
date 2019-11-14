import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmService } from '@fuse/services/confirm.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { RegionFormDialogComponent } from 'app/main/apps/corporate/region/region-form/region-form.component';
import { RegionService } from "../region.service";

@Component({
    selector     : 'region-list',
    templateUrl  : './region-list.component.html',
    styleUrls    : ['./region-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class RegionListComponent implements OnInit, OnDestroy
{
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;
    
    dataSource: FilesDataSource | null;
    user: any;
    regions: any;
    displayedColumns = [ 'name', 'buttons'];
    selectedContacts: any[];
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {RegionService} _regionService
     * @param {MatDialog} _matDialog
     */
    constructor(
        public _matDialog: MatDialog,
        public _confirm: ConfirmService,
        public _regionService: RegionService
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
        this.dataSource = new FilesDataSource(this._regionService);

        this._regionService.onConsorcioChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                this.regions = data;
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
     * Edit Code Region
     *
     * @param region
     */
    updateRegion(region): void
    {
        this.dialogRef = this._matDialog.open(RegionFormDialogComponent, {
            panelClass: 'region-form-dialog',
            data      : {
                region: region,
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

                        this._regionService.updateRegion(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteRegion(region);

                        break;
                }
            });
    }

    /**
     * Delete Code Region
     */
    deleteRegion(code): void
    { 
        this._confirm.SwalConfirm().then(res => {
            if (res) {
              this._regionService.deleteRegion(code);
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
     * @param {RegionService} _regionService
     */
    constructor(
        private _regionService: RegionService
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
        return this._regionService.onConsorcioChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}


  

