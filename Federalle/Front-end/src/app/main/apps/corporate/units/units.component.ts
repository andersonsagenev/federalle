import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { RequestService } from '@fuse/services/request.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { MatSort, MatDialog, MatDialogRef, MatTableDataSource, MatPaginator } from '@angular/material';

import { fuseAnimations } from '@fuse/animations';
import { ConfirmService } from '@fuse/services/confirm.service';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FuseUtils } from '@fuse/utils';

import { UnitsService } from 'app/main/apps/corporate/units/units.service';
import { takeUntil } from 'rxjs/internal/operators';

@Component({
    selector: 'units',
    templateUrl: './units.component.html',
    styleUrls: ['./units.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class UnitsComponent implements OnInit {

    searchInput: FormControl;
    dataSource: FilesDataSource | null;
    displayedColumns = ['name', 'contact', 'cpfCnpj', 'buttons'];
    searchInput: FormControl;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _unitsService: UnitsService,
        public _confirm: ConfirmService,
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
        // this.dataSource = new FilesDataSource(this._unitsService, this.paginator, this.sort);
        this.dataSource = new FilesDataSource(this._unitsService);

        // if (dataSource.length) {
        //     this.exist = true;
        // } else {
        //     this.exist = false;
        // }
        console.log('retorno de clientes ~>', this.dataSource)

        // fromEvent(this.filter.nativeElement, 'keyup')
        //     .pipe(
        //         takeUntil(this._unsubscribeAll),
        //         debounceTime(150),
        //         distinctUntilChanged()
        //     )
        //     .subscribe(() => {
        //         if ( !this.dataSource )
        //         {
        //             return;
        //         }

        //         this.dataSource.filter = this.filter.nativeElement.value;
        //     });
    }

    /**
     * Delete Unity
     */
    deleteUnity(unity): void
    { 
        this._confirm.SwalConfirm().then(res => {
            if (res) {
              this._unitsService.deleteUnity(unity);
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
     * @param {UnitsService} _unitsService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _unitsService: UnitsService,
        // private _matPaginator: MatPaginator,
        // private _matSort: MatSort
    )
    {
        super();
       
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this._unitsService.onUnitsChanged;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

   

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}





