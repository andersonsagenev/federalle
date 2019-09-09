import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { StatusContractService } from "./status-representative.service";
import { fuseAnimations } from "@fuse/animations";
import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";
import { StatusRepFormDialogComponent } from "app/main/apps/contract/status-representative/form-representative/form-representative.component";

@Component({
    selector: "status-representative",
    templateUrl: "./status-representative.component.html",
    styleUrls: ["./status-representative.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StatusRepresentativeComponent implements OnInit, OnDestroy {
    dialogRef: any;
    hasSelectedContacts: boolean;
    searchInput: FormControl;
    status: any;
    exist: boolean = false;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {StatusContractService} _representativeService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog,
        private _representativeService: StatusContractService
    ) {
        // Set the defaults
        this.searchInput = new FormControl("");

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._representativeService.onStatusContractChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
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
                this._representativeService.onSearchTextChanged.next(searchText);
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * New Status Representante
     */
    newStatusContract(): void {
        this.dialogRef = this._matDialog.open(StatusRepFormDialogComponent, {
            panelClass: "form-representative-dialog",
            data: {
                action: "new"
            }
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this._representativeService.addStatusContract(response.getRawValue());
        });
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
