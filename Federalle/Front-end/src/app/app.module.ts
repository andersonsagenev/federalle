import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';
import { RequestService } from '@fuse/services/request.service';
import { AlertService } from '@fuse/services/alert.service';
import { NgxMaskModule } from 'ngx-mask';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { TextMaskModule } from 'angular2-text-mask';


import { LyThemeModule, LY_THEME } from '@alyle/ui';
import { LyButtonModule } from '@alyle/ui/button';
import { LyToolbarModule } from '@alyle/ui/toolbar';
import { LyResizingCroppingImageModule } from '@alyle/ui/resizing-cropping-images';
import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';

const appRoutes: Routes = [
    {
        path        : 'apps',
        loadChildren: './main/apps/apps.module#AppsModule'
    },
    {
        path        : 'pages',
        loadChildren: './main/pages/pages.module#PagesModule'
    },
    {
        path      : '**',
        redirectTo: 'pages/auth/login'
    },
    // {
    //     path      : '**',
    //     redirectTo: 'app/main/apps/users'
    // },
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        NgxMaskModule.forRoot(),
        TranslateModule.forRoot(),

        LyThemeModule.setTheme('minima-light'),
        LyButtonModule,
        LyToolbarModule,
        LyResizingCroppingImageModule,
        TextMaskModule,

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
       
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
        RequestService,
        AlertService,
        { provide: LY_THEME, useClass: MinimaLight, multi: true }, // name: `minima-light`
        { provide: LY_THEME, useClass: MinimaDark, multi: true } // name: `minima-dark`
      ],
})
export class AppModule
{
}
