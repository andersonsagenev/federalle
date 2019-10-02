import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule
   , MatSelectModule, MatSlideToggleModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { ConfirmService } from '@fuse/services/confirm.service';
import { UsersComponent } from 'app/main/apps/users/users.component';
import { UserService } from 'app/main/apps/users/users.service';
import { UserFormDialogComponent } from 'app/main/apps/users/user-form/user-form.component';
import { UserFormService } from 'app/main/apps/users/user-form/user-form.service';

const routes: Routes = [
    {
        path     : '**',
        component: UsersComponent,
        resolve  : {
            contacts: UserService
        }
    }
];

@NgModule({
    declarations   : [
        UsersComponent,
        UserFormDialogComponent,
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
        FuseSidebarModule
    ],
    providers      : [
        UserService,
        ConfirmService,
        UserFormService
    ],
    entryComponents: [
        UserFormDialogComponent
    ]
})
export class ContactsModule
{
}
