import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDividerModule, MatIconModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatStepperModule, MatToolbarModule } from '@angular/material';
import { ProfileService } from 'app/main/pages/profile/profile.service';
import { FuseSharedModule } from '@fuse/shared.module';
import { ProfileComponent } from 'app/main/pages/profile/profile.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';
import { resetFormDialogComponent } from 'app/main/pages/profile/reset-form/reset-form.component';

import { LyResizingCroppingImageModule } from '@alyle/ui/resizing-cropping-images';
import { LyButtonModule } from '@alyle/ui/button';
import { LyIconModule } from '@alyle/ui/icon';



const routes = [
    {
        path     : 'profile/:id',
        component: ProfileComponent,
        resolve  : {
            data: ProfileService,
        }
    }
];

@NgModule({
    declarations: [
        ProfileComponent,
        resetFormDialogComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatToolbarModule,

        FuseSharedModule,
        TranslateModule,
        NgxMaskModule,
        LyResizingCroppingImageModule,
        LyButtonModule,
        LyIconModule,
    ],
    entryComponents: [
        resetFormDialogComponent
    ],
    providers   : [
        ProfileService
    ],
})
export class ProfileModule
{
}
