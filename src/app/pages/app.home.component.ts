import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/assets/demo/applicationservice';

@Component({
    selector: 'home',
    templateUrl: './app.home.component.html',
})
export class AppHomeComponent implements OnInit {
    loginCredentials: any;

    sortOptions: any[];

    sortOrder: number;

    sortField: string;

    constructor(private applicationService: ApplicationService) { }

    ngOnInit() {
    }
}
