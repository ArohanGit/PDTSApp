import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Factory } from "../../domain/factory";
import { FactoryService } from "../../services/factory.service";



@Component({
    selector: 'factory-page',
    templateUrl: './factory-page.component.html',
    providers: [MessageService]
})
export class FactoryPageComponent implements OnInit {
    public displayUserAccessDialog = false;

    factoryList: Factory[] = [];
    
    constructor(private router: Router,
        private messageService: MessageService,
        private factoryService: FactoryService) {
    }

    ngOnInit(): void {
        // this.useraccessService.LoadList({} as UserAccess).then(l => {
        //     this.useraccessList = l;
        // });

    }

   

}