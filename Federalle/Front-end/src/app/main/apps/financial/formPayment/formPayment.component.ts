import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { PaymentService } from "./formPayment.service";
import { fuseAnimations } from "@fuse/animations";
import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";
import { PaymentFormDialogComponent } from "app/main/apps/financial/formPayment/form-payment/form-payment.component";

@Component({
    selector: "formPayment",
    templateUrl: "./formPayment.component.html",
    styleUrls: ["./formPayment.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FormPaymentComponent implements OnInit, OnDestroy {
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
     * @param {PaymentService} _paymentService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog,
        private _paymentService: PaymentService
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
        this._paymentService.onPaymentChanged
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
                this._paymentService.onSearchTextChanged.next(searchText);
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
     * New Form Payment
     */
    newFormPayment(): void {
        this.dialogRef = this._matDialog.open(PaymentFormDialogComponent, {
            panelClass: "form-payment-dialog",
            data: {
                action: "new"
            }
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this._paymentService.addFormPayment(response.getRawValue());
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
