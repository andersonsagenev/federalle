import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { RequestService } from '@fuse/services/request.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSort, MatDialog, MatDialogRef, MatTableDataSource, MatPaginator } from '@angular/material';
import { ConfirmService } from '@fuse/services/confirm.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { FuseUtils } from '@fuse/utils';
import { CustomersService } from 'app/main/apps/corporate/customers/customers.service';


@Component({
    selector: 'customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class CustomersComponent implements OnInit {


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
        private _customersService: CustomersService,
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
        // this.dataSource = new FilesDataSource(this._customersService, this.paginator, this.sort);
        this.dataSource = new FilesDataSource(this._customersService);

        // if (dataSource.length) {
        //     this.exist = true;
        // } else {
        //     this.exist = false;
        // }
        console.log('retorno de clientes ~>', this.dataSource)

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this._customersService.onSearchTextChanged.next(searchText);
            });

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
     * Delete Client
     */
    deleteClient(cliente): void
    { 
        this._confirm.SwalConfirm().then(res => {
            if (res) {
              this._customersService.deleteClient(cliente);
            }
          }).catch(err => {
            console.log('Error', err)
          })
    }

    
}

export class FilesDataSource extends DataSource<any>
{
    // private _filterChange = new BehaviorSubject('');
    // private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     *
     * @param {CustomersService} _customersService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _customersService: CustomersService,
        // private _matPaginator: MatPaginator,
        // private _matSort: MatSort
    )
    {
        super();

       // this.filteredData = this._customersService.clients;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this._customersService.onCustomersChanged;

        // const displayDataChanges = [
        //     this._customersService.onCustomersChanged,
        //     this._matPaginator.page,
        //     this._filterChange,
        //     this._matSort.sortChange
        // ];

        // return merge(...displayDataChanges)
        //     .pipe(
        //         map(() => {
        //                 let data = this._customersService.clients.slice();

        //                 data = this.filterData(data);

        //                 this.filteredData = [...data];

        //                 data = this.sortData(data);

        //                 // Grab the page's slice of data.
        //                 const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
        //                 return data.splice(startIndex, this._matPaginator.pageSize);
        //             }
        //         ));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    // get filteredData(): any
    // {
    //     return this._filteredDataChange.value;
    // }

    // set filteredData(value: any)
    // {
    //     this._filteredDataChange.next(value);
    // }

    // Filter
    // get filter(): string
    // {
    //     return this._filterChange.value;
    // }

    // set filter(filter: string)
    // {
    //     this._filterChange.next(filter);
    // }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    // filterData(data): any
    // {
    //     if ( !this.filter )
    //     {
    //         return data;
    //     }
    //     return FuseUtils.filterArrayByString(data, this.filter);
    // }

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    // sortData(data): any[]
    // {
    //     if ( !this._matSort.active || this._matSort.direction === '' )
    //     {
    //         return data;
    //     }

    //     return data.sort((a, b) => {
    //         let propertyA: number | string = '';
    //         let propertyB: number | string = '';

    //         switch ( this._matSort.active )
    //         {
               
    //             case 'name':
    //                 [propertyA, propertyB] = [a.name, b.name];
    //                 break;
    //             case 'contact':
    //                 [propertyA, propertyB] = [a.categories[0], b.categories[0]];
    //                 break;
    //             case 'cpfCnpj':
    //                 [propertyA, propertyB] = [a.priceTaxIncl, b.priceTaxIncl];
    //                 break;
    //         }

    //         const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
    //         const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

    //         return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
    //     });
    // }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}





