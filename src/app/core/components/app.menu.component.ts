import {Component, OnInit} from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { LeftMenuService } from '../services/app.leftmenu.service';
import { AppLoginService } from '../services/app.login.service';


@Component({
    selector: 'app-menu',
    providers: [ LeftMenuService ],
    template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
        </ul>
    `    
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppComponent, private menuService: LeftMenuService, private appLoginService: AppLoginService,) {}

    ngOnInit() {
        this.menuService.getMenuItems().then(data => this.model = data);        
       //this.showRoleWiseMenu();
    }

    showRoleWiseMenu() {
        this.menuService.getMenuItems().then(data => {
            let _data = [...data];
            let menus = ''; // 'Home, Favorites, Templates, Project, Users';
            this.model = [...[]];
            debugger;
            if (this.appLoginService.LoggedInInfo?.RoleName === 'User') {
                menus = 'Home,ATN Entry,GST Challan,Material Return';
                this.model = _data.filter(d=> menus.includes(d.label));
            }
            if (this.appLoginService.LoggedInInfo?.RoleName === 'Factory Manager' || this.appLoginService.LoggedInInfo?.RoleName === 'GST Approver') {
                menus = 'Home,Atn Approval,GST Challan';
                this.model = _data.filter(d=> menus.includes(d.label));
            }
            if (this.appLoginService.LoggedInInfo?.RoleName === 'Admin') {
                menus = 'Home,Asset Transfer Note,GST Challan,Material Return,Masters';
                this.model = _data.filter(d=> menus.includes(d.label));
            }
        });
    }

}
