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
import { FactoryListComponent } from './features/factory/factory-list.component';
import { FactoryPageComponent } from './features/factory/factory-page.component';
import { FactoryService } from './services/factory.service';

@NgModule({
    declarations: [
        // DashboardComponent,
        FactoryListComponent,
        FactoryPageComponent,
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
        FactoryService,
    ],
    exports: [
        
    ]
  })
  export class PDTSModule { }
