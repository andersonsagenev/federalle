import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule, MatSelectModule, MatSlideToggleModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { ConfirmService } from '@fuse/services/confirm.service';
import { TextMaskModule } from 'angular2-text-mask';

import { CustomersComponent } from 'app/main/apps/corporate/customers/customers.component';
import { CustomerComponent } from 'app/main/apps/corporate/customer/customer.component';

import { StatusComponent } from 'app/main/apps/contract/status-contract/status.component';
import { StatusFormDialogComponent } from 'app/main/apps/contract/status-contract/form-status/form-status.component';
import { StatusListComponent } from 'app/main/apps/contract/status-contract/status-list/status-list.component';
import { StatusService } from '../contract/status-contract/status.service';

import { StatusContractService } from '../contract/status-representative/status-representative.service';
import { StatusRepresentativeComponent } from 'app/main/apps/contract/status-representative/status-representative.component';
import { StatusRepFormDialogComponent } from 'app/main/apps/contract/status-representative/form-representative/form-representative.component';
import { StatusRepresentativeListComponent } from 'app/main/apps/contract/status-representative/representative-list/representative-list.component';

// import { BanksService } from '../corporate/banks/banks.service';
// import { BanksComponent } from 'app/main/apps/corporate/banks/banks.component';
// import { BankFormDialogComponent } from 'app/main/apps/corporate/banks/banks-form/banks-form.component';
// import { BanksListComponent } from 'app/main/apps/corporate/banks/banks-list/banks-list.component';

// import { BenefitsComponent } from 'app/main/apps/corporate/benefits/benefits.component';
// import { BenefitsFormDialogComponent } from 'app/main/apps/corporate/benefits/benefits-form/benefits-form.component';
// import { BenefitsListComponent } from 'app/main/apps/corporate/benefits/benefits-list/benefits-list.component';
// import { BenefitsService } from '../corporate/benefits/benefits.service';

const routes: Routes = [
    // {
    //     path     : 'customers',
    //     component: CustomersComponent,
        
    // },
    // {
    //     path     : 'customer',
    //     component: CustomerComponent,
    // },
    // {
    //     path     : 'customer/:id',
    //     component: CustomerComponent,
    // },
    {
        path     : 'status-contract',
        component: StatusComponent,
        resolve  : {
            data: StatusService
        }
    },
    {
        path     : 'status-representative',
        component: StatusRepresentativeComponent,
        resolve  : {
            data: StatusContractService
        }
    },
    // {
    //     path     : 'banks',
    //     component: BanksComponent,
    //     resolve  : {
    //         data: BanksService
    //     }
    // },
    // {
    //     path     : 'benefits',
    //     component: BenefitsComponent,
    //     resolve  : {
    //         data: BenefitsService
    //     }
    // }
];

@NgModule({
    declarations   : [
        StatusComponent,
        StatusFormDialogComponent,
        StatusListComponent,
        // CustomerComponent,
        // CustomersComponent,
        StatusRepresentativeComponent,
        StatusRepresentativeListComponent,
        StatusRepFormDialogComponent,
        // BenefitsComponent,
        // BenefitsListComponent,
        // BenefitsFormDialogComponent,
        // BankFormDialogComponent,
        // BanksListComponent,
        // BanksComponent
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatSelectModule,
        MatSlideToggleModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        TextMaskModule
    ],
    providers      : [
        ConfirmService,
        StatusService,
        StatusContractService
        // PlanoService,
        // BanksService,
        // BenefitsService
       
    ],
    entryComponents: [
        StatusFormDialogComponent,
        StatusRepFormDialogComponent,
        // BenefitsFormDialogComponent,
        // BankFormDialogComponent
    ]
})
export class ContractModule
{
}
