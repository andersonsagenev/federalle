import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule, MatSelectModule, MatSlideToggleModule, MatSnackBarModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { ConfirmService } from '@fuse/services/confirm.service';
import { TextMaskModule } from 'angular2-text-mask';

import { ListContractComponent } from 'app/main/apps/contract/list-contracts/list-contracts.component';
import { ContractsComponent } from 'app/main/apps/contract/contracts/contracts.component';
import { ContractsService } from '../contract/contracts/contracts.service';
import { ListContractService } from '../contract/list-contracts/list-contracts.service';

import { StatusComponent } from 'app/main/apps/contract/status-contract/status.component';
import { StatusFormDialogComponent } from 'app/main/apps/contract/status-contract/form-status/form-status.component';
import { StatusListComponent } from 'app/main/apps/contract/status-contract/status-list/status-list.component';
import { StatusService } from '../contract/status-contract/status.service';

import { StatusContractService } from '../contract/status-representative/status-representative.service';
import { StatusRepresentativeComponent } from 'app/main/apps/contract/status-representative/status-representative.component';
import { StatusRepFormDialogComponent } from 'app/main/apps/contract/status-representative/form-representative/form-representative.component';
import { StatusRepresentativeListComponent } from 'app/main/apps/contract/status-representative/representative-list/representative-list.component';

import { ContractNumberService } from '../contract/contract-number/contract-number.service';
import { ContractNumberComponent } from 'app/main/apps/contract/contract-number/contract-number.component';
import { ContractNumberFormDialogComponent } from 'app/main/apps/contract/contract-number/number-form/number-form.component';
import { ContractNumberListComponent } from 'app/main/apps/contract/contract-number/number-list/number-list.component';

// import { BenefitsComponent } from 'app/main/apps/corporate/benefits/benefits.component';
// import { BenefitsFormDialogComponent } from 'app/main/apps/corporate/benefits/benefits-form/benefits-form.component';
// import { BenefitsListComponent } from 'app/main/apps/corporate/benefits/benefits-list/benefits-list.component';
// import { BenefitsService } from '../corporate/benefits/benefits.service';

const routes: Routes = [
    {
        path     : 'list-contracts',
        component: ListContractComponent,
        resolve  : {
            data: ListContractService
        }
    },
    {
        path     : 'contracts',
        component: ContractsComponent,
        resolve  : {
            data: ContractsService
        }
    },
    {
        path     : 'contracts/:id',
        component: ContractsComponent,
        resolve  : {
            data: ContractsService
        }
    },
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
    {
        path     : 'contract-number',
        component: ContractNumberComponent,
        resolve  : {
            data: ContractNumberService
        }
    },
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
        ContractsComponent,
        ListContractComponent,
        StatusRepresentativeComponent,
        StatusRepresentativeListComponent,
        StatusRepFormDialogComponent,
        ContractNumberComponent,
        ContractNumberListComponent,
        ContractNumberFormDialogComponent,
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
        MatSnackBarModule,
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        TextMaskModule
    ],
    providers      : [
        ConfirmService,
        StatusService,
        StatusContractService,
        ContractsService,
        ContractNumberService,
        ListContractService
       
    ],
    entryComponents: [
        StatusFormDialogComponent,
        StatusRepFormDialogComponent,
        ContractNumberFormDialogComponent,
        // BankFormDialogComponent
    ]
})
export class ContractModule
{
}
