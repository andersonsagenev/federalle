import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';

import { AssemblyDateComponent } from 'app/main/apps/corporate/date-assembly/date-assembly.component';
import { AssemblyDateService } from 'app/main/apps/corporate/date-assembly/date-assembly.service';
import { AssemblyListComponent } from 'app/main/apps/corporate/date-assembly/date-assembly-list/assembly-list.component';
import { ContactsSelectedBarComponent } from 'app/main/apps/corporate/date-assembly/selected-bar/selected-bar.component';
import { ContactsMainSidebarComponent } from 'app/main/apps/corporate/date-assembly/sidebars/main/main.component';
import { AssemblyFormDialogComponent } from 'app/main/apps/corporate/date-assembly/date-assembly-form/assembly-form.component';

const routes: Routes = [
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
        AssemblyDateComponent,
        AssemblyListComponent,
        ContactsSelectedBarComponent,
        ContactsMainSidebarComponent,
        AssemblyFormDialogComponent
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

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],
    providers      : [
        AssemblyDateService
    ],
    entryComponents: [
        AssemblyFormDialogComponent
    ]
})
export class AssemblyModule
{
}
