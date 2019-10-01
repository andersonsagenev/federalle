import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { FakeDbService } from 'app/fake-db/fake-db.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

const routes = [
    {
        path        : 'dashboards',
        loadChildren: './dashboards/dashboard.module#ProjectDashboardModule'
    },
    {
        path        : 'corporate',
        loadChildren: './corporate/corporate.module#CorporateModule'
    },
    {
        path        : 'contract',
        loadChildren: './contract/contract.module#ContractModule'
    },
    {
        path        : 'financial',
        loadChildren: './financial/financial.module#FinancialModule'
    },
    {
        path        : 'users',
        loadChildren: './users/users.module#ContactsModule'
    },
    {
        path        : 'representative',
        loadChildren: './representative/representative.module#RepresentativeModule'
    },
    // {
    //     path        : 'mail',
    //     loadChildren: './mail/mail.module#MailModule'
    // },
    // {
    //     path        : 'chat',
    //     loadChildren: './chat/chat.module#ChatModule'
    // },
    // {
    //     path        : 'calendar',
    //     loadChildren: './calendar/calendar.module#CalendarModule'
    // },
    // {
    //     path        : 'academy',
    //     loadChildren: './academy/academy.module#AcademyModule'
    // },
    // {
    //     path        : 'class',
    //     loadChildren: './class/class.module#ClassModule'
    // },
    // {
    //     path        : 'file-manager',
    //     loadChildren: './file-manager/file-manager.module#FileManagerModule'
    // },
    // {
    //     path        : 'modules',
    //     loadChildren: './modules/modules.module#ModulesModule'
    // },
    // {
    //     path        : 'surveys',
    //     loadChildren: './surveys/surveys.module#SurveysModule'
    // },
    // {
    //     path        : 'contacts',
    //     loadChildren: './contacts/contacts.module#ContactsModule'
    // },
    // {
    //     path        : 'companys',
    //     loadChildren: './companys/companys.module#CompanysModule'
    // }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,

        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),
    ]
})
export class AppsModule
{
}
