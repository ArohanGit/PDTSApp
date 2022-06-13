import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { APP_PRIMENG_MODULE } from '../app.primeng';
import { AppAuthGuardService } from '../core/guards/app.authguard.service';

import { EmptyComponent } from './component/empty.component';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
    declarations: [
      EmptyComponent
    ],    
    imports: [
        CommonModule,  
        FormsModule,
        SharedRoutingModule,
        HttpClientModule,

        APP_PRIMENG_MODULE
    ],
    providers: [
        AppAuthGuardService
    ]
  })
  export class SharedModule { }