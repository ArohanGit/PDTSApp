import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { MarketLeadtimeService } from "../../services/marketleadtime.service";
import { LeadtimeScopeExt } from "./leadtime-scope-ext";




@Component({
    selector: 'leadtime-scopes-page',
    templateUrl: './leadtime-scopes-page.component.html',
    providers: [MessageService]
})
export class LeadtimeScopesPageComponent implements OnInit {
    public MarketLeadtimeDialog = false;

    leadtimescopeList: LeadtimeScopeExt[] = [];
   

    constructor(private router: Router,
        private messageService: MessageService,
        private marketleadtimeService: MarketLeadtimeService) {
    }

    ngOnInit(): void {
        this.marketleadtimeService.getleadtimescope().then(l => {
            this.leadtimescopeList = l;
        });

    }
     


}