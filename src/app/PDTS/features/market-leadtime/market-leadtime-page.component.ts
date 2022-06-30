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
    marketleadtimeProductWiseFilterList: MarketLeadtimeExt[] = [];
    productFilterList: MarketLeadtimeExt[] = [];
    productList: MarketLeadtimeExt[] = [];
    marketleadtimeFormData: { [s: string]: MarketLeadtimeExt } = {};

    constructor(private router: Router,
        private messageService: MessageService,
        private marketleadtimeService: MarketLeadtimeService) {
    }

    ngOnInit(): void {
        this.marketleadtimeService.getproduct().then(p => {
            this.productList = p;
        });
        this.marketleadtimeService.getmarketleadtime().then(l => {
            this.marketleadtimeList = l;
        });

    }
    onEdit(product: MarketLeadtimeExt) {
        debugger;
        //this.marketleadtimeFormData = { ...$event };
        //this.MarketLeadtimeDialog = true;
        this.marketleadtimeFormData[product.ProductID] = {...product};
    }

    onSave($event) {
        // this.marketleadtimeService.save($event).then(u => {

        //     const i = this.marketleadtimeFilterList.findIndex(p => p.MarketLeadtimeID === u.MarketLeadtimeID);
        //     if (i >= 0) {
        //         this.marketleadtimeFilterList[i] = { ...u };
        //     }
        //     else {
        //         this.marketleadtimeFilterList.push(u);
        //     }
        //     this.marketleadtimeFilterList = [...this.marketleadtimeFilterList]
        // });
        // this.MarketLeadtimeDialog = false;
    }

   
    onChangeFactory($event) {
        debugger;
        const p = [...this.productList.filter(dp => dp.FactoryID === $event.value)];
        this.productFilterList = [...p];
        const l = [...this.marketleadtimeList.filter(d => d.FactoryID === $event.value)];
        this.marketleadtimeFilterList = [...l];
    }

    onChangeProduct($event) {
        debugger;
        const f = [...this.marketleadtimeList.filter(d => d.ProductID === $event)];
        this.marketleadtimeProductWiseFilterList = [...f];
    }

    // onChangeProduct($event) {
    //     debugger;
    //     const l = [...this.marketleadtimeFilterList.filter(d => d.ProductID === $event.value)];
    //     this.marketleadtimeFilterList = [...l];

    // }


}