import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { APP_PRIMENG_MODULE } from '../app.primeng';
import { AppAuthGuardService } from '../core/guards/app.authguard.service';
import { HttpBasicAuthInterceptor } from '../interceptors/http-basic-auth.interceptor';
import { PdfViewerModule, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService,
    ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService } from '@syncfusion/ej2-angular-pdfviewer';
import { PDTSRoutingModule } from './pdts-routing.module';
import { FactoryScopesListComponent } from './features/factory-scopes/factory-scopes-list.component';
import { FactoryScopesPageComponent } from './features/factory-scopes/factory-scopes-page.component';
import { FactoryScopesService } from './services/factoryscopes.service';
import { FactoryScopesFormComponent } from './features/factory-scopes/factory-scopes-form.component';
import { FactoryService } from './services/factory.service';
import { ProductService } from './services/product.service';
import { ProductDetailService } from './services/productdetail.service';
import { ProductDetailFormComponent } from './features/product-detail/product-detail-form.component';
import { ProductDetailListComponent } from './features/product-detail/product-detail-list.component';
import { ProductDetailPageComponent } from './features/product-detail/product-detail-page.component';
import { MarketLeadtimeFormComponent } from './features/market-leadtime/market-leadtime-form.component';
import { MarketLeadtimeListComponent } from './features/market-leadtime/market-leadtime-list.component';
import { MarketLeadtimePageComponent } from './features/market-leadtime/market-leadtime-page.component';
import { MarketLeadtimeService } from './services/marketleadtime.service';
import { LeadtimeScopesListComponent } from './features/leadtime-scopes/leadtime-scopes-list.component';
import { LeadtimeScopesPageComponent } from './features/leadtime-scopes/leadtime-scopes-page.component';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { UserFormComponent } from './features/user/user-form.component';
import { UserListComponent } from './features/user/user-list.component';
import { UserPageComponent } from './features/user/user-page.component';
import { RoleFormComponent } from './features/role/role-form.component';
import { RoleListComponent } from './features/role/role-list.component';
import { RolePageComponent } from './features/role/role-page.component';

@NgModule({
    declarations: [
        // DashboardComponent,
        FactoryScopesListComponent,
        FactoryScopesPageComponent,
        FactoryScopesFormComponent,
        ProductDetailFormComponent,
        ProductDetailListComponent,
        ProductDetailPageComponent,
        MarketLeadtimeFormComponent,
        MarketLeadtimeListComponent,
        MarketLeadtimePageComponent,
        LeadtimeScopesListComponent,
        LeadtimeScopesPageComponent,
        UserFormComponent,
        UserListComponent,
        UserPageComponent,
        RoleFormComponent,
        RoleListComponent,
        RolePageComponent,

    ],
    imports: [
        CommonModule,
        FormsModule,
        PDTSRoutingModule,
        HttpClientModule,
        PdfViewerModule,
        APP_PRIMENG_MODULE,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpBasicAuthInterceptor,
            multi: true
        },
        LinkAnnotationService, BookmarkViewService, MagnificationService,
        ThumbnailViewService, ToolbarService, NavigationService,
        TextSearchService, TextSelectionService, PrintService,

        AppAuthGuardService,
        FactoryScopesService,
        FactoryService,
        ProductService,
        ProductDetailService,
        MarketLeadtimeService,
        UserService,
        RoleService,
    ],
    exports: [
        
    ]
  })
  export class PDTSModule { }
