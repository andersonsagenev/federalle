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
        IndicatorsComponent,
        IndicatorFormDialogComponent,
        IndicatorListComponent,
        FormPaymentComponent,
        PaymentFormDialogComponent,
        PaymentListComponent
       
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
        
       
    ],
    entryComponents: [
        IndicatorFormDialogComponent,
        PaymentFormDialogComponent
       
    ]
})
export class FinancialModule
{
}
