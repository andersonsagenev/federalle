import {
    Component,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material";
import { DataSource } from "@angular/cdk/collections";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ConfirmService } from "@fuse/services/confirm.service";
import { fuseAnimations } from "@fuse/animations";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { ContractNumberFormDialogComponent } from "app/main/apps/contract/contract-number/number-form/number-form.component";
import { ContractNumberService } from "../contract-number.service";

@Component({
    selector: "number-list",
    templateUrl: "./number-list.component.html",
    styleUrls: ["./number-list.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ContractNumberListComponent implements OnInit, OnDestroy {
    @ViewChild("dialogContent")
    dialogContent: TemplateRef<any>;

    dataSource: FilesDataSource | null;
    user: any;
    exist: boolean = false;
    contractNumbers: any;
    displayedColumns = [
        "number",
        "endNumber",
        "idRepresentative",
        "idConsortium",
        "buttons"
    ];
    selectedContacts: any[];
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ContractNumberService} _numberService
     * @param {MatDialog} _matDialog
     */
    constructor(
        public _matDialog: MatDialog,
        public _confirm: ConfirmService,
        public _numberService: ContractNumberService
    ) {
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
        this.dataSource = new FilesDataSource(this._numberService);

        this._numberService.onContractNumberChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                this.contractNumbers = data;
                if (data.length) {
                    this.exist = true;
                } else {
                    this.exist = false;
                }
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
     * Edit Numbers
     *
     * @param number
     */
    updateContractNumber(number): void {
        this.dialogRef = this._matDialog.open(
            ContractNumberFormDialogComponent,
            {
                panelClass: "number-form-dialog",
                data: {
                    number: number,
                    action: "edit"
                }
            }
        );
        this.dialogRef.afterClosed().subscribe(response => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            const formData: FormGroup = response[1];
            switch (actionType) {
                /**
                 * Save
                 */
                case "save":
                    this._numberService.addContractNumber(
                        formData.getRawValue()
                    );

                    break;
                /**
                 * Delete
                 */
                case "delete":
                    this.deleteContractNumbers(number);

                    break;
            }
        });
    }

    /**
     * Delete Numbers
     */
    deleteContractNumbers(number): void {
        this._confirm
            .SwalConfirm()
            .then(res => {
                if (res) {
                    this._numberService.deleteContractNumber(number);
                }
            })
            .catch(err => {
                console.log("Error", err);
            });
    }
}

export class FilesDataSource extends DataSource<any> {
    /**
     * Constructor
     *
     * @param {ContractNumberService} _numberService
     */
    constructor(private _numberService: ContractNumberService) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this._numberService.onContractNumberChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {}
}
