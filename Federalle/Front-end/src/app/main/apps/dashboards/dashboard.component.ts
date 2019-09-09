import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import * as shape from 'd3-shape';

import { fuseAnimations } from '@fuse/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { ProjectDashboardService } from 'app/main/apps/dashboards/dashboard.service';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { RequestService } from '@fuse/services/request.service';
import { Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

@Component({
    selector     : 'dashboards',
    templateUrl  : './dashboard.component.html',
    styleUrls    : ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    providers: [
        ProjectDashboardService,
        { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
        { provide: LOCALE_ID, useValue: 'pt-br'}
    ]
})
export class ProjectDashboardComponent implements OnInit
{
    projects: any[];
    selectedSchool: any;
    user: any;
    role: any;
    school: any;
    schools: any;
    _disabled: boolean = false;
    widget: any;
    widget1SelectedYear = '2016';

    widgets: any;
    widgetss: any;
    widget5: any = {};
    widget6: any = {};
    widget7: any = {};
    widget8: any = {};
    widget9: any = {};
    widget11: any = {};
    tamanho: any[] = [500, 300];

    dateNow = Date.now();

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#039be5', '#C7B42C', '#AAAAAA', '#4867d2', '#5c84f1', '#89a9f4', 'rgb(85, 194, 45)']
    };

    chart: {
        scheme : {
            domain: ['#5AA454', '#A10A28', '#039be5', '#C7B42C', '#AAAAAA', '#4867d2', '#5c84f1', '#89a9f4', 'rgb(85, 194, 45)']
        },
        devices: [
            {
                name  : 'Aulas Bncc',
                value : 92.8,
                change: -0.6
            },
            {
                name  : 'Aulas s/ Bncc',
                value : 6.1,
                change: 0.7
            },
            {
                name  : 'Outros',
                value : 1.1,
                change: 0.1
            }
        ]
    }

    devices: any = [
        {
            name  : 'Aulas Bncc',
            value : 92.8,
            change: -0.6
        },
        {
            name  : 'Aulas s/ Bncc',
            value : 6.1,
            change: 0.7
        },
        {
            name  : 'Outros',
            value : 1.1,
            change: 0.1
        }
    ]
//}

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {ProjectDashboardService} _projectDashboardService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _fuseConfigService: FuseConfigService,
        private _projectDashboardService: ProjectDashboardService,
        private _request: RequestService,
        private _router: Router,
    )
    {
         // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                footer   : {
                    hidden: true
                }
            }
        };
        /**
         * Widget 5
         */
        this.widget5 = {
            currentRange  : 'TW',
            xAxis         : true,
            yAxis         : true,
            gradient      : false,
            legend        : false,
            showXAxisLabel: false,
            xAxisLabel    : 'Days',
            showYAxisLabel: false,
            yAxisLabel    : 'Isues',
            scheme        : {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            onSelect      : (ev) => {
                console.log(ev);
            },
            supporting    : {
                currentRange  : '',
                xAxis         : false,
                yAxis         : false,
                gradient      : false,
                legend        : false,
                showXAxisLabel: false,
                xAxisLabel    : 'Days',
                showYAxisLabel: false,
                yAxisLabel    : 'Isues',
                scheme        : {
                    domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
                },
                curve         : shape.curveBasis
            }
        };

        /**
         * Widget 6
         */
        this.widget6 = {
            currentRange : 'TW',
            legend       : false,
            explodeSlices: false,
            labels       : true,
            doughnut     : true,
            gradient     : false,
            scheme       : {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63']
            },
            onSelect     : (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 7
         */
        this.widget7 = {
            currentRange: 'T'
        };

        /**
         * Widget 8
         */
        this.widget8 = {
            legend       : false,
            explodeSlices: false,
            labels       : true,
            doughnut     : false,
            gradient     : false,
            scheme       : {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107']
            },
            onSelect     : (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 9
         */
        this.widget9 = {
            currentRange  : 'TW',
            xAxis         : false,
            yAxis         : false,
            gradient      : false,
            legend        : false,
            showXAxisLabel: false,
            xAxisLabel    : 'Days',
            showYAxisLabel: false,
            yAxisLabel    : 'Isues',
            scheme        : {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            curve         : shape.curveBasis
        };

        setInterval(() => {
            this.dateNow = Date.now();
        }, 1000);

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.projects = this._projectDashboardService.projects;
       // this.selectedSchool = this.projects[0];
        this.widgets = this._projectDashboardService.widgets;

        /**
         * Widget 11
         */
        this.widget11.onContactsChanged = new BehaviorSubject({});
       // this.widget11.onContactsChanged.next(this.widgets.widget11.table.rows);
       // this.widget11.dataSource = new FilesDataSource(this.widget11);

        this.user = JSON.parse(localStorage.getItem('currentUser'))
        console.log('Usuario logado ===>', this.user)
        if(this.user){
            console.log('Escola do usuario ===>')
            // this.role = this.user.role.name
        }

       
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

    getSchools(){
        this._request.server('parent', 'get').subscribe(data =>{
          this.schools = data.data;
          if(this.schools)
          console.log('ESCOLAS', this.schools)
          },error=>{
           console.log('Error',error)
         })
      }
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param _widget11
     */
    constructor(private _widget11)
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
        return this._widget11.onContactsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}

