import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmService } from '@fuse/services/confirm.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ConsorcioFormDialogComponent } from 'app/main/apps/corporate/consorcio/form-consorcio/form-consorcio.component';
import { ConsorcioService } from '../consorcio.service';

@Component({
    selector     : 'consorcio-list',
    templateUrl  : './consorcio-list.component.html',
    styleUrls    : ['./consorcio-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ConsorcioListComponent implements OnInit, OnDestroy
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
     * @param {ConsorcioService} _consorcioService
     * @param {MatDialog} _matDialog
     */
    constructor(
        public _matDialog: MatDialog,
        public _confirm: ConfirmService,
        public _consorcioService: ConsorcioService
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
        this.dataSource = new FilesDataSource(this._consorcioService);

        this._consorcioService.onConsorcioChanged
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
     * Edit Consorcio
     *
     * @param consorcio
     */
    updateConsorcio(consorcio): void
    {
        this.dialogRef = this._matDialog.open(ConsorcioFormDialogComponent, {
            panelClass: 'form-consorcio-dialog',
            data      : {
                consorcio: consorcio,
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

                        this._consorcioService.updateConsorcio(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteConsorcio(consorcio);

                        break;
                }
            });
    }

    /**
     * Delete Consorcio
     */
    deleteConsorcio(consorcio): void
    { 
        this._confirm.SwalConfirm().then(res => {
            if (res) {
              this._consorcioService.deleteConsorcio(consorcio);
              console.log('Deletou o id', res)
            }
          }).catch(err => {
            console.log('Error', err)
          })

    }

    /**
     * On selected change
     *
     * @param contactId
     */
    onSelectedChange(contactId): void
    {
       // this._proposalService.toggleSelectedContact(contactId);
    }

    /**
     * Toggle star
     *
     * @param contactId
     */
    toggleStar(contactId): void
    {
        if ( this.user.starred.includes(contactId) )
        {
            this.user.starred.splice(this.user.starred.indexOf(contactId), 1);
        }
        else
        {
            this.user.starred.push(contactId);
        }

       // this._proposalService.updateUserData(this.user);
    }
  
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {ConsorcioService} _consorcioService
     */
    constructor(
        private _consorcioService: ConsorcioService
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
        return this._consorcioService.onConsorcioChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}


  

