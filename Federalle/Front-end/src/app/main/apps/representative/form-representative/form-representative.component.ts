import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { Representative } from 'app/main/apps/representative/form-representative/representative.model';
import { RepresentativeService } from 'app/main/apps/representative/form-representative/form-representative.service';

@Component({
    selector     : 'form-representative',
    templateUrl  : './form-representative.component.html',
    styleUrls    : ['./form-representative.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class RepresentativeComponent implements OnInit, OnDestroy
{
    representante: Representative;
    pageType: string;
    representativeForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {RepresentativeService} _representativeService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _representativeService: RepresentativeService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar
    )
    {
        // Set the default
        this.representante = new Representative();

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
        // Subscribe to update product on changes
        // this._representativeService.onProductChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(product => {

        //         if ( product )
        //         {
        //             this.product = new Product(product);
        //             this.pageType = 'edit';
        //         }
        //         else
        //         {
        //             this.pageType = 'new';
        //             this.product = new Product();
        //         }

        //         this.representativeForm = this.createRepresentativeForm();
        //     });
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
     * Create representative form
     *
     * @returns {FormGroup}
     */
    createRepresentativeForm(): FormGroup
    {
        return this._formBuilder.group({
            id              : [this.representante.id],
            name            : [this.representante.name],
            handle          : [this.representante.handle],
            idMaster     : [this.representante.idMaster],
            idCity      : [this.representante.idCity],
            idCity1      : [this.representante.idCity1],
            idStatusPartnershipContract            : [this.representante.idStatusPartnershipContract],
            idBank          : [this.representante.idBank],
            idUser    : [this.representante.idUser],
            cpfCnpj    : [this.representante.cpfCnpj],
            telefone1         : [this.representante.telefone1],
            telefone2         : [this.representante.telefone2],
            telefone3         : [this.representante.telefone3],
            email1   : [this.representante.email1],
            email2   : [this.representante.email2],
            email3   : [this.representante.email3],
            zip        : [this.representante.zip],
            zip1        : [this.representante.zip1],
            andress             : [this.representante.andress],
            andress1             : [this.representante.andress1  ],
            number           : [this.representante.number],
            number1           : [this.representante.number1],
            complement          : [this.representante.complement],
            complement1          : [this.representante.complement1],
            district           : [this.representante.district],
            district1           : [this.representante.district1],
            bankesName          : [this.representante.bankesName],
            bankesCpfCnpj: [this.representante.bankesCpfCnpj],
            banckAgency          : [this.representante.banckAgency],
            bankAccount          : [this.representante.bankAccount],
            bankOperation          : [this.representante.bankOperation],
            emailFinance          : [this.representante.emailFinance],
            withholdTax          : [this.representante.withholdTax],
            canErase          : [this.representante.canErase],
        });
    }
    

    /**
     * Save product
     */
    saveProduct(): void
    {
        const data = this.representativeForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        this._representativeService.saveProduct(data)
            .then(() => {

                // Trigger the subscription with new data
                this._representativeService.onProductChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Product saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
    }

    /**
     * Add representante
     */
    addRepresentante(): void
    {
        const data = this.representativeForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        this._representativeService.addProduct(data)
            .then(() => {

                // Trigger the subscription with new data
                this._representativeService.onProductChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Product added', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // Change the location with new one
                this._location.go('apps/representative/form-representative/' + this.representante.id + '/' + this.representante.handle);
            });
    }
}
