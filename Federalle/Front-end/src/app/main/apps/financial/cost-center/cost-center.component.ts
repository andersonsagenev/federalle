import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { CostCenterService } from "./cost-center.service";
import { fuseAnimations } from "@fuse/animations";
import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";
import { CostCenterFormDialogComponent } from "app/main/apps/financial/cost-center/cost-center-form/cost-center-form.component";

@Component({
    selector: "cost-center",
    templateUrl: "./cost-center.component.html",
    styleUrls: ["./cost-center.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CostCenterComponent implements OnInit, OnDestroy {
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
     * @param {CostCenterService} _costCenterService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog,
        private _costCenterService: CostCenterService
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
        this._costCenterService.onCostCenterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                // if (data.length) {
                //     this.exist = true;
                // } else {
                //     this.exist = false;
                // }
            });

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this._costCenterService.onSearchTextChanged.next(searchText);
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
     * New Cost Center
     */
    newCostCenter(): void {
        this.dialogRef = this._matDialog.open(CostCenterFormDialogComponent, {
            panelClass: "cost-center-form-dialog",
            data: {
                action: "new"
            }
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this._costCenterService.addCostCenter(response.getRawValue());
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
