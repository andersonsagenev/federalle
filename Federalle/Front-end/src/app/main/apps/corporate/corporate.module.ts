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

import { CustomersComponent } from 'app/main/apps/corporate/customers/customers.component';
import { CustomerComponent } from 'app/main/apps/corporate/customer/customer.component';
import { CustomerService } from '../corporate/customer/customer.service';
import { CustomersService } from '../corporate/customers/customers.service';

import { UnitsComponent } from 'app/main/apps/corporate/units/units.component';
import { UnityComponent } from 'app/main/apps/corporate/unity/unity.component';
import { UnityService } from '../corporate/unity/unity.service';
import { UnitsService } from '../corporate/units/units.service';

import { ConsorcioComponent } from 'app/main/apps/corporate/consorcio/consorcio.component';
import { ConsorcioFormDialogComponent } from 'app/main/apps/corporate/consorcio/form-consorcio/form-consorcio.component';
import { ConsorcioListComponent } from 'app/main/apps/corporate/consorcio/consorcio-list/consorcio-list.component';
import { ConsorcioService } from '../corporate/consorcio/consorcio.service';

import { SectorComponent } from 'app/main/apps/corporate/sector/sector.component';
import { SectorFormDialogComponent } from 'app/main/apps/corporate/sector/form-sector/form-sector.component';
import { SectorListComponent } from 'app/main/apps/corporate/sector/sector-list/sector-list.component';
import { SectorService } from '../corporate/sector/sector.service';

import { PlanoService } from '../corporate/plano/plano.service';
import { PlanoComponent } from 'app/main/apps/corporate/plano/plano.component';
import { PlanoFormDialogComponent } from 'app/main/apps/corporate/plano/plano-form/plano-form.component';
import { PlanoListComponent } from 'app/main/apps/corporate/plano/plano-list/plano-list.component';

import { VerificationService } from '../corporate/verification/verification.service';
import { VerificationComponent } from 'app/main/apps/corporate/verification/verification.component';
import { VerificationFormDialogComponent } from 'app/main/apps/corporate/verification/verification-form/verification-form.component';
import { VerificationListComponent } from 'app/main/apps/corporate/verification/verification-list/verification-list.component';

import { BanksService } from '../corporate/banks/banks.service';
import { BanksComponent } from 'app/main/apps/corporate/banks/banks.component';
import { BankFormDialogComponent } from 'app/main/apps/corporate/banks/banks-form/banks-form.component';
import { BanksListComponent } from 'app/main/apps/corporate/banks/banks-list/banks-list.component';

import { RegionService } from '../corporate/region/region.service';
import { RegionComponent } from 'app/main/apps/corporate/region/region.component';
import { RegionFormDialogComponent } from 'app/main/apps/corporate/region/region-form/region-form.component';
import { RegionListComponent } from 'app/main/apps/corporate/region/region-list/region-list.component';

import { BenefitsComponent } from 'app/main/apps/corporate/benefits/benefits.component';
import { BenefitsFormDialogComponent } from 'app/main/apps/corporate/benefits/benefits-form/benefits-form.component';
import { BenefitsListComponent } from 'app/main/apps/corporate/benefits/benefits-list/benefits-list.component';
import { BenefitsService } from '../corporate/benefits/benefits.service';

import { AssemblyDateComponent } from 'app/main/apps/corporate/date-assembly/date-assembly.component';
import { AssemblyDateService } from 'app/main/apps/corporate/date-assembly/date-assembly.service';
import { AssemblyListComponent } from 'app/main/apps/corporate/date-assembly/date-assembly-list/assembly-list.component';
import { ContactsSelectedBarComponent } from 'app/main/apps/corporate/date-assembly/selected-bar/selected-bar.component';
import { ContactsMainSidebarComponent } from 'app/main/apps/corporate/date-assembly/sidebars/main/main.component';
import { AssemblyFormDialogComponent } from 'app/main/apps/corporate/date-assembly/date-assembly-form/assembly-form.component';

const routes: Routes = [
    {
        path     : 'customers',
        component: CustomersComponent,
        resolve  : {
            data: CustomersService
        }
        
    },
    {
        path     : 'customer/:id',
        component: CustomerComponent,
        resolve  : {
            data: CustomerService
        }
    },
    {
        path     : 'units',
        component: UnitsComponent,
        resolve  : {
            data: UnitsService
        }
        
    },
    {
        path     : 'unity/:id',
        component: UnityComponent,
        resolve  : {
            data: UnityService
        }
    },
    {
        path     : 'consorcio',
        component: ConsorcioComponent,
        resolve  : {
            data: ConsorcioService
        }
    },
    {
        path     : 'plano',
        component: PlanoComponent,
        resolve  : {
            data: PlanoService
        }
    },
    {
        path     : 'banks',
        component: BanksComponent,
        resolve  : {
            data: BanksService
        }
    },
    {
        path     : 'benefits',
        component: BenefitsComponent,
        resolve  : {
            data: BenefitsService
        }
    },
    {
        path     : 'sector',
        component: SectorComponent,
        resolve  : {
            data: SectorService
        }
    },
    {
        path     : 'verification',
        component: VerificationComponent,
        resolve  : {
            data: VerificationService
        }
    },
    {
        path     : 'region',
        component: RegionComponent,
        resolve  : {
            data: RegionService
        }
    },
    {
        path     : '**',
        component: AssemblyDateComponent,
        resolve  : {
            contacts: AssemblyDateService
        }
    }
];

@NgModule({
    declarations   : [
        ConsorcioComponent,
        ConsorcioFormDialogComponent,
        ConsorcioListComponent,
        CustomerComponent,
        CustomersComponent,
        UnitsComponent,
        UnityComponent,
        PlanoComponent,
        PlanoListComponent,
        PlanoFormDialogComponent,
        BenefitsComponent,
        BenefitsListComponent,
        BenefitsFormDialogComponent,
        BankFormDialogComponent,
        BanksListComponent,
        BanksComponent,
        SectorListComponent,
        SectorFormDialogComponent,
        SectorComponent,
        VerificationFormDialogComponent,
        VerificationComponent,
        VerificationListComponent,
        RegionFormDialogComponent,
        RegionListComponent,
        AssemblyDateComponent,
        AssemblyListComponent,
        ContactsSelectedBarComponent,
        ContactsMainSidebarComponent,
        AssemblyFormDialogComponent,
        RegionComponent

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
        ConsorcioService,
        PlanoService,
        BanksService,
        BenefitsService,
        CustomersService,
        CustomerService,
        UnityService,
        UnitsService,
        SectorService,
        VerificationService,
        AssemblyDateService,
        RegionService
       
    ],
    entryComponents: [
        ConsorcioFormDialogComponent,
        PlanoFormDialogComponent,
        BenefitsFormDialogComponent,
        BankFormDialogComponent,
        SectorFormDialogComponent,
        VerificationFormDialogComponent,
        AssemblyFormDialogComponent,
        RegionFormDialogComponent
    ]
})
export class CorporateModule
{
}
