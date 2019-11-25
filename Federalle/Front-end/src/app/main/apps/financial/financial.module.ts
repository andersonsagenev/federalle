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

import { FormPaymentComponent } from 'app/main/apps/financial/formPayment/formPayment.component';
import { PaymentFormDialogComponent } from 'app/main/apps/financial/formPayment/form-payment/form-payment.component';
import { PaymentListComponent } from 'app/main/apps/financial/formPayment/formPayment-list/formPayment-list.component';
import { PaymentService } from '../financial/formPayment/formPayment.service';

import { IndicatorsComponent } from 'app/main/apps/financial/indicators/indicators.component';
import { IndicatorFormDialogComponent } from 'app/main/apps/financial/indicators/form-indicator/form-indicator.component';
import { IndicatorListComponent } from 'app/main/apps/financial/indicators/list-indicator/list-indicator.component';
import { IndicatorService } from '../financial/indicators/indicators.service';

import { CommissionComponent } from 'app/main/apps/financial/receipt-commission/receipt-commission.component';
import { CommissionsFormDialogComponent } from 'app/main/apps/financial/receipt-commission/receipt-commission-form/receipt-commission-form.component';
import { CommissionsListComponent } from 'app/main/apps/financial/receipt-commission/receipt-commission-list/receipt-commission-list.component';
import { ReceiptCommissionService } from './receipt-commission/receipt-commission.service';

import { GridCommissionComponent } from 'app/main/apps/financial/grid-commission/grid-commission.component';
import { GridCommissionService } from 'app/main/apps/financial/grid-commission/grid-commission.service';
import { GridFormDialogComponent } from 'app/main/apps/financial/grid-commission/grid-commission-form/grid-form.component';

import { BankAccountComponent } from 'app/main/apps/financial/bank-account/bank-account.component';
import { BankAccountService } from 'app/main/apps/financial/bank-account/bank-account.service';
import { BankAccountFormDialogComponent } from 'app/main/apps/financial/bank-account/bank-account-form/bank-account-form.component';

import { CostCenterComponent } from 'app/main/apps/financial/cost-center/cost-center.component';
import { CostCenterService } from 'app/main/apps/financial/cost-center/cost-center.service';
import { CostCenterFormDialogComponent } from 'app/main/apps/financial/cost-center/cost-center-form/cost-center-form.component';
import { CostCenterListComponent } from 'app/main/apps/financial/cost-center/cost-center-list/cost-center-list.component';

import { ServicesComponent } from 'app/main/apps/financial/services/services.component';
import { ServicesService } from 'app/main/apps/financial/services/services.service';
import { ServicesFormDialogComponent } from 'app/main/apps/financial/services/services-form/services-form.component';
import { ServicesListComponent } from 'app/main/apps/financial/services/services-list/services-list.component';




const routes: Routes = [
    {
        path     : 'indicators',
        component: IndicatorsComponent,
        resolve  : {
            data: IndicatorService
        }
    },
    {
        path     : 'formPayment',
        component: FormPaymentComponent,
        resolve  : {
            data: PaymentService
        }
    },
    {
        path     : 'receipt-commission',
        component: CommissionComponent,
        resolve  : {
            data: ReceiptCommissionService
        }
    },
    {
        path     : 'grid-commission',
        component: GridCommissionComponent,
        resolve  : {
            data: GridCommissionService
        }
    },
    {
        path     : 'bank-account',
        component: BankAccountComponent,
        resolve  : {
            data: BankAccountService
        }
    },
    {
        path     : 'cost-center',
        component: CostCenterComponent,
        resolve  : {
            data: CostCenterService
        }
    },
    {
        path     : 'services',
        component: ServicesComponent,
        resolve  : {
            data: ServicesService
        }
    }
];

@NgModule({
    declarations   : [
        IndicatorsComponent,
        IndicatorFormDialogComponent,
        IndicatorListComponent,
        FormPaymentComponent,
        PaymentFormDialogComponent,
        PaymentListComponent,
        CommissionComponent,
        CommissionsFormDialogComponent,
        CommissionsListComponent,
        GridCommissionComponent,
        GridFormDialogComponent,
        BankAccountFormDialogComponent,
        BankAccountComponent,
        CostCenterComponent,
        CostCenterListComponent,
        CostCenterFormDialogComponent,
        ServicesFormDialogComponent,
        ServicesListComponent,
        ServicesComponent
       
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
        IndicatorService,
        PaymentService,
        ReceiptCommissionService,
        GridCommissionService,
        BankAccountService,
        CostCenterService,
        ServicesService
        
    ],
    entryComponents: [
        IndicatorFormDialogComponent,
        PaymentFormDialogComponent,
        CommissionsFormDialogComponent,
        GridFormDialogComponent,
        BankAccountFormDialogComponent,
        CostCenterFormDialogComponent,
        ServicesFormDialogComponent
       
    ]
})
export class FinancialModule
{
}
