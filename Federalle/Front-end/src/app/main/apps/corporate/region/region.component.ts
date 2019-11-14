import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { RequestService } from '@fuse/services/request.service';
import { ConfirmService } from '@fuse/services/confirm.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { RegionService } from "./region.service";
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { RegionFormDialogComponent } from 'app/main/apps/corporate/region/region-form/region-form.component';

@Component({
    selector     : 'region',
    templateUrl  : './region.component.html',
    styleUrls    : ['./region.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class RegionComponent implements OnInit, OnDestroy
{
    dialogRef: any;
    hasSelectedContacts: boolean;
    searchInput: FormControl;
    exist: boolean = false;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {RegionService} _regionService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog,
        private _alert: ConfirmService,
        private _regionService: RegionService
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
        this._regionService.onConsorcioChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                console.log('Regioes ===>', data)
                if (data.length) {
                    this.exist = true;
                } else {
                    this.exist = false;
                }
            });

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this._regionService.onSearchTextChanged.next(searchText);
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
     * New Code Region
     */
    newRegion(): void
    {
        this.dialogRef = this._matDialog.open(RegionFormDialogComponent, {
            panelClass: 'region-form-dialog',
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
                console.log('Regioes ...', response)
                this._regionService.addRegion(response.getRawValue());
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
