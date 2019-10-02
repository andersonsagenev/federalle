import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatSortModule, MatCheckboxModule,
    MatTableModule, MatTabsModule
} from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { ConfirmService } from '@fuse/services/confirm.service';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { TextMaskModule } from 'angular2-text-mask';

import { RepresentativesComponent } from 'app/main/apps/representative/representatives/representatives.component';
import { RepresentativesService } from 'app/main/apps/representative/representatives/representatives.service';
import { RepresentativeComponent } from 'app/main/apps/representative/form-representative/form-representative.component';
import { RepresentativeService } from 'app/main/apps/representative/form-representative/form-representative.service';


const routes: Routes = [
    {
        path     : 'representatives',
        component: RepresentativesComponent,
        resolve  : {
            data: RepresentativesService
        }
    },
    {
        path     : 'form-representative/:id',
        component: RepresentativeComponent,
        resolve  : {
            data: RepresentativeService
        }
    },
    // {
    //     path     : 'form-representative/:id/:handle',
    //     component: RepresentativeComponent,
    //     resolve  : {
    //         data: RepresentativeService
    //     }
    // },
   
];

@NgModule({
    declarations: [
        RepresentativesComponent,
        RepresentativeComponent,
       
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatCheckboxModule,

        NgxChartsModule,
        TextMaskModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule
    ],
    providers   : [
        RepresentativeService,
        RepresentativesService,
        ConfirmService
       
    ]
})
export class RepresentativeModule
{
}
