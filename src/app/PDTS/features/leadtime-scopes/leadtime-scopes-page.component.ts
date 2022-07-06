import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { MarketLeadtimeService } from "../../services/marketleadtime.service";
import { LeadtimeScopeExt } from "./leadtime-scope-ext";
import * as FileSaver from 'file-saver';


@Component({
    selector: 'leadtime-scopes-page',
    templateUrl: './leadtime-scopes-page.component.html',
    providers: [MessageService]
})
export class LeadtimeScopesPageComponent implements OnInit {
    public MarketLeadtimeDialog = false;
    frozenCols: any[];
    leadtimescopeList: LeadtimeScopeExt[] = [];
    leadtimescopeFilterList: LeadtimeScopeExt[] = [];
   

    constructor(private router: Router,
        private messageService: MessageService,
        private marketleadtimeService: MarketLeadtimeService) {
    }

    ngOnInit(): void {
        this.marketleadtimeService.getleadtimescope().then(l => {
            this.leadtimescopeList = l;
        });


    }
     
    onChange($event){
        debugger;
        const l  = [...this.leadtimescopeList.filter(d => d.FactoryID === $event.value)];
        this.leadtimescopeFilterList = [...l];
        
        }

        exportExcel() {
            import("xlsx").then(xlsx => {
                const worksheet = xlsx.utils.json_to_sheet(this.leadtimescopeFilterList);
                const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
                const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
                this.saveAsExcelFile(excelBuffer, "factory leadtime");
            });
        }
    
        saveAsExcelFile(buffer: any, fileName: string): void {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let EXCEL_EXTENSION = '.xlsx';
            const data: Blob = new Blob([buffer], {
                type: EXCEL_TYPE
            });
            FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        }    

}