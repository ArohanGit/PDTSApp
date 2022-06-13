import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_PRIMENG_MODULE, APP_PRIMENG_SERVICE } from './app.primeng';
import { AppMainComponent } from './core/layouts/main/app.main.component';
import { AppBreadcrumbComponent } from './core/components/app.breadcrumb.component';
import { AppConfigComponent } from './core/components/app.config.component';
import { AppFooterComponent } from './core/components/app.footer.component';
import { AppInlineMenuComponent } from './core/components/app.inlinemenu.component';
import { AppMenuComponent } from './core/components/app.menu.component';
import { AppMenuitemComponent } from './core/components/app.menuitem.component';
import { AppRightMenuComponent } from './core/components/app.rightmenu.component';
import { AppTopBarComponent } from './core/components/app.topbar.component';
import { AppBreadcrumbService } from './core/services/app.breadcrumb.service';
import { AppErrorHandler } from './core/services/app.error.handler';
import { AppErrorService } from './core/services/app.error.service';
import { MenuService } from './core/services/app.menu.service';
import { AppLoginService } from './core/services/app.login.service';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppHelpComponent } from './pages/app.help.component';
import { AppLoginComponent } from './pages/app.login.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { environment } from 'src/environments/environment';
import { HttpBasicAuthInterceptor } from './interceptors/http-basic-auth.interceptor';
import { AppEnvironmentConfigService } from './core/services/app.environment-config.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { AppExcelExportService } from './core/services/app.export-excel.service';
import { AppHomeComponent } from './pages/app.home.component';
import { ApplicationService } from 'src/assets/demo/applicationservice';

export function EnvironmentConfigLoader(environmentConfigService: AppEnvironmentConfigService) {
    return () => environmentConfigService.load(environment.metaDataPath + 'environment-data.json');
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        ConfirmDialogModule,

        AppRoutingModule,
        HttpClientModule,

        APP_PRIMENG_MODULE,
    ],
    declarations: [
        AppComponent,

        AppMainComponent,
        // PDFViewerLayoutComponent,
        AppConfigComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppInlineMenuComponent,
        AppRightMenuComponent,

        AppBreadcrumbComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppAccessdeniedComponent,
        AppErrorComponent,
        AppHelpComponent,
        AppLoginComponent,
        AppHomeComponent,
        AppNotfoundComponent
    ],
    providers: [
        APP_PRIMENG_SERVICE,

        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: ErrorHandler, useClass: AppErrorHandler },
        AppErrorService,
        AppBreadcrumbService,
        ConfirmationService,
        AppExcelExportService,

        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpBasicAuthInterceptor,
            multi: true
        },

        AppEnvironmentConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: EnvironmentConfigLoader,
            deps: [AppEnvironmentConfigService],
            multi: true
        },

        AppLoginService,
        MenuService,
        ApplicationService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
