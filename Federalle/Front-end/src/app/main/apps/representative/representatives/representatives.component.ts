import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { RepresentativesService } from 'app/main/apps/representative/representatives/representatives.service';
import { takeUntil } from 'rxjs/internal/operators';

@Component({
    selector     : 'representatives',
    templateUrl  : './representatives.component.html',
    styleUrls    : ['./representatives.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class RepresentativesComponent implements OnInit
{
    dataSource: FilesDataSource | null;
    displayedColumns = ['id', 'image', 'name', 'category', 'price', 'quantity', 'active'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;
    exist: boolean = false;

    @ViewChild('filter')
    filter: ElementRef;

    public maskTelefone = [
        "+",
        /[1-9]/,
        /\d/,
        " ",
        "(",
        /[1-9]/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
    ];
    public maskCelular = [
        "+",
        /[1-9]/,
        /\d/,
        " ",
        "(",
        /[1-9]/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
    ];
    public cpfMask = [
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/
    ];
    public cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];
    public cnpjMask = [
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "/",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/
    ];

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _representativeService: RepresentativesService
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
        this.dataSource = new FilesDataSource(this._representativeService);
        console.log('representantes ~~>', this.dataSource)

         if (this._representativeService.representatives.length) {
            this.exist = true;
        } else {
            this.exist = false;
        }

        fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if ( !this.dataSource )
                {
                    return;
                }

                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }
}

export class FilesDataSource extends DataSource<any>
{
    //private _filterChange = new BehaviorSubject('');
   // private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     *
     * @param {RepresentativeService} _representativeService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _representativeService: RepresentativesService,
       // private _matPaginator: MatPaginator,
       // private _matSort: MatSort
    )
    {
        super();

       // this.filteredData = this._representativeService.representatives;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._representativeService.onRepresentanteChanged,
            // this._matPaginator.page,
            // this._filterChange,
            // this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                        if(this._representativeService.representatives){

                        let data = this._representativeService.representatives.slice();

                        data = this.filterData(data);

                        this.filteredData = [...data];

                       // data = this.sortData(data);

                        // Grab the page's slice of data.
                      //  const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                        // return data.splice(startIndex, this._matPaginator.pageSize);
                        return data;
                        }
                    }
                ));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    // get filteredData(): any
    // {
    //     return this._filteredDataChange.value;
    // }

    set filteredData(value: any)
    {
       // this._filteredDataChange.next(value);
    }

    // Filter
    // get filter(): string
    // {
    //     return this._filterChange.value;
    // }

    set filter(filter: string)
    {
      //  this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

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
    //             case 'id':
    //                 [propertyA, propertyB] = [a.id, b.id];
    //                 break;
    //             case 'name':
    //                 [propertyA, propertyB] = [a.name, b.name];
    //                 break;
    //             case 'categories':
    //                 [propertyA, propertyB] = [a.categories[0], b.categories[0]];
    //                 break;
    //             case 'price':
    //                 [propertyA, propertyB] = [a.priceTaxIncl, b.priceTaxIncl];
    //                 break;
    //             case 'quantity':
    //                 [propertyA, propertyB] = [a.quantity, b.quantity];
    //                 break;
    //             case 'active':
    //                 [propertyA, propertyB] = [a.active, b.active];
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
