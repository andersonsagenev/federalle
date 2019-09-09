import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmService } from '@fuse/services/confirm.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { VerificationFormDialogComponent } from 'app/main/apps/corporate/verification/verification-form/verification-form.component';
import { VerificationService } from "../verification.service";

@Component({
    selector     : 'verification-list',
    templateUrl  : './verification-list.component.html',
    styleUrls    : ['./verification-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class VerificationListComponent implements OnInit, OnDestroy
{
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;
    
    dataSource: FilesDataSource | null;
    user: any;
    verifications: any;
    displayedColumns = [ 'name', 'buttons'];
    selectedContacts: any[];
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {VerificationService} _verificationService
     * @param {MatDialog} _matDialog
     */
    constructor(
        public _matDialog: MatDialog,
        public _confirm: ConfirmService,
        public _verificationService: VerificationService
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
        this.dataSource = new FilesDataSource(this._verificationService);

        this._verificationService.onVerificationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                this.verifications = data;
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
     * Edit Verification
     *
     * @param verification
     */
    updateVerification(verification): void
    {
        this.dialogRef = this._matDialog.open(VerificationFormDialogComponent, {
            panelClass: 'verification-form-dialog',
            data      : {
                verification: verification,
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

                        this._verificationService.updateVerification(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteVerification(verification);

                        break;
                }
            });
    }

    /**
     * Delete Plan
     */
    deleteVerification(plan): void
    { 
        this._confirm.SwalConfirm().then(res => {
            if (res) {
              this._verificationService.deleteVerification(plan);
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
     * @param {VerificationService} _verificationService
     */
    constructor(
        private _verificationService: VerificationService
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
        return this._verificationService.onVerificationChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}


  

