import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { AssemblyDateService } from 'app/main/apps/corporate/date-assembly/date-assembly.service';

@Component({
    selector   : 'selected-bar',
    templateUrl: './selected-bar.component.html',
    styleUrls  : ['./selected-bar.component.scss']
})
export class ContactsSelectedBarComponent implements OnInit, OnDestroy
{
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    hasSelectedContacts: boolean;
    isIndeterminate: boolean;
    selectedContacts: string[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {AssemblyDateService} _assemblyService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _assemblyService: AssemblyDateService,
        public _matDialog: MatDialog
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
        this._assemblyService.onSelectedContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedContacts => {
                this.selectedContacts = selectedContacts;
                setTimeout(() => {
                    this.hasSelectedContacts = selectedContacts.length > 0;
                    this.isIndeterminate = (selectedContacts.length !== this._assemblyService.assemblys.length && selectedContacts.length > 0);
                }, 0);
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
     * Select all
     */
    selectAll(): void
    {
        this._assemblyService.selectContacts();
    }

    /**
     * Deselect all
     */
    deselectAll(): void
    {
        this._assemblyService.deselectContacts();
    }

    /**
     * Delete selected contacts
     */
    deleteSelectedContacts(): void
    {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Você tem certeza de excluir os registros?';

        this.confirmDialogRef.afterClosed()
            .subscribe(result => {
                if ( result )
                {
                    this._assemblyService.deleteSelectedContacts();
                }
                this.confirmDialogRef = null;
            });
    }
}
