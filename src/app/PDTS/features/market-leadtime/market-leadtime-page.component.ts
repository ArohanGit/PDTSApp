import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { MarketLeadtime } from "../../domain/market-leadtime";
import { MarketLeadtimeService } from "../../services/marketleadtime.service";
import { MarketLeadtimeExt } from "./market-leadtime-ext";



@Component({
    selector: 'market-leadtime-page',
    templateUrl: './market-leadtime-page.component.html',
    providers: [MessageService]
})
export class MarketLeadtimePageComponent implements OnInit {
    public MarketLeadtimeDialog = false;

    marketleadtimeList: MarketLeadtimeExt[] = [];
    marketleadtimeFilterList: MarketLeadtimeExt[] = [];
    marketleadtimeFormData: MarketLeadtimeExt = {} as MarketLeadtimeExt;

    constructor(private router: Router,
        private messageService: MessageService,
        private marketleadtimeService: MarketLeadtimeService) {
    }

    ngOnInit(): void {
        this.marketleadtimeService.getmarketleadtime().then(l => {
            this.marketleadtimeList = l;
        });

    }
    onEdit($event) {
        debugger;
        this.marketleadtimeFormData = { ...$event };
        this.MarketLeadtimeDialog = true;
    }

    onHide($event) {
        this.MarketLeadtimeDialog = false;
    }

    onSave($event) {
        this.marketleadtimeService.save($event).then(u => {

            const i = this.marketleadtimeFilterList.findIndex(p => p.MarketLeadtimeID === u.MarketLeadtimeID);
            if (i >= 0) {
                this.marketleadtimeFilterList[i] = { ...u };
            }
            else {
                this.marketleadtimeFilterList.push(u);
            }
            this.marketleadtimeFilterList = [...this.marketleadtimeFilterList]
        });
        this.MarketLeadtimeDialog = false;
    }

   
    onChangeFactoryScope($event) {
        debugger;
        const l = [...this.marketleadtimeList.filter(d => d.Scope === $event.value)];
        this.marketleadtimeFilterList = [...l];

    }

    // onChangeProduct($event) {
    //     debugger;
    //     const l = [...this.marketleadtimeFilterList.filter(d => d.ProductID === $event.value)];
    //     this.marketleadtimeFilterList = [...l];

    // }


}