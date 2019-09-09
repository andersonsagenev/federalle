import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { RequestService } from '@fuse/services/request.service';
import { ConfirmService } from '@fuse/services/confirm.service';
import { BenefitsService } from "./benefits.service";
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { BenefitsFormDialogComponent } from 'app/main/apps/corporate/benefits/benefits-form/benefits-form.component';

@Component({
    selector     : 'benefits',
    templateUrl  : './benefits.component.html',
    styleUrls    : ['./benefits.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class BenefitsComponent implements OnInit, OnDestroy
{
    dialogRef: any;
    hasSelectedContacts: boolean;
    searchInput: FormControl;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {BenefitsService} _benefitsService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog,
        private _request: RequestService,
        private _alert: ConfirmService,
        public _benefitsService: BenefitsService
    )
    {
        // Set the defaults
        this.searchInput = new FormControl('');

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
     * New Bem
     */
    newBem(): void
    {
        this.dialogRef = this._matDialog.open(BenefitsFormDialogComponent, {
            panelClass: 'benefits-form-dialog',
            data      : {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }
                this._benefitsService.addBenefits(response.getRawValue());
            });
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
