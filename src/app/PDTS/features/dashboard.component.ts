import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from 'src/app/core/layouts/main/app.main.component';
import { AppComponent } from 'src/app/app.component';
import { combineLatest } from 'rxjs';
import { AppLoginService } from 'src/app/core/services/app.login.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    templateUrl: './dashboard.component.html',
    styles: [`
        .ql-editor {
            padding: 0px !important;
        }
    `]
})
export class DashboardComponent implements OnInit {

    constructor(public app: AppComponent,
        public appMain: AppMainComponent,
        public appLoginService: AppLoginService,
        private router: Router,
        public sanitizer: DomSanitizer,
    ) {

    }

    ngOnInit() {
        // if (!this.appLoginService.LoggedInInfo || !this.appLoginService.LoggedInInfo.EmployeeId) { this.router.navigateByUrl('/login'); }
    }

    joinMasters() {
    }
}
