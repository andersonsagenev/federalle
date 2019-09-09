import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmService } from '@fuse/services/confirm.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { BenefitsFormDialogComponent } from 'app/main/apps/corporate/benefits/benefits-form/benefits-form.component';
import { BenefitsService } from "../benefits.service";
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
    selector     : 'benefits-list',
    templateUrl  : './benefits-list.component.html',
    styleUrls    : ['./benefits-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ]


})
export class BenefitsListComponent implements OnInit, OnDestroy
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
     * @param {BenefitsService} _benefitService
     * @param {MatDialog} _matDialog
     */
    constructor(
        public _matDialog: MatDialog,
        public _confirm: ConfirmService,
        public _benefitService: BenefitsService
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
        this.dataSource = new FilesDataSource(this._benefitService);

        this._benefitService.onBenefitsChanged
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
     * Edit Beneficio
     *
     * @param bem
     */
    updateBem(bem): void
    {
        this.dialogRef = this._matDialog.open(BenefitsFormDialogComponent, {
            panelClass: 'benefits-form-dialog',
            data      : {
                benefit: bem,
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

                    this._benefitService.updateBenefits(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteBem(bem);

                        break;
                }
            });
    }

    /**
     * Delete Beneficio
     */
    deleteBem(bem): void
    { 
        this._confirm.SwalConfirm().then(res => {
            if (res) {
              this._benefitService.deleteBenefits(bem);
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
     * @param {BenefitsService} _benefitsService
     */
    constructor(
        private _benefitsService: BenefitsService
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
        return this._benefitsService.onBenefitsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}


  

