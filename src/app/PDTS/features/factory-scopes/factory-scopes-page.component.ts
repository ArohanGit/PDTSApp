import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { FactoryScope } from "../../domain/factory-scope";
import { FactoryScopesService } from "../../services/factoryscopes.service";



@Component({
    selector: 'factory-scopes-page',
    templateUrl: './factory-scopes-page.component.html',
    providers: [MessageService]
})
export class FactoryScopesPageComponent implements OnInit {
    public FactoryScopeDialog = false;

    factoryList: FactoryScope[] = [];
    factoryFilterList: FactoryScope[] = [];
    factoryscopeFormData: FactoryScope = {} as FactoryScope;

    constructor(private router: Router,
        private messageService: MessageService,
        private factoryscopesService: FactoryScopesService) {
    }

    ngOnInit(): void {
        this.factoryscopesService.get().then(l => {
            this.factoryList = l;
        });

    }
    onEdit($event) {
        this.factoryscopeFormData = { ...$event };
        this.FactoryScopeDialog = true;
    }

    onHide($event) {
        this.FactoryScopeDialog = false;
    }

    onSave($event) {
        this.factoryscopesService.save($event).then(u => {
            
            const i = this.factoryFilterList.findIndex(p => p.FactoryScopeID === u.FactoryScopeID);
            if (i >= 0) {
                this.factoryFilterList[i] = { ...u };
            }
            else {
                this.factoryFilterList.push(u);
            }
            this.factoryFilterList = [...this.factoryFilterList]
        });
        this.FactoryScopeDialog = false;
    }

    onChange($event){
        debugger;
        const l  = [...this.factoryList.filter(d => d.FactoryID === $event.value)];
        this.factoryFilterList = [...l];
        
        }


}