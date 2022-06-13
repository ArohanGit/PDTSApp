import {Component} from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AppMainComponent } from '../layouts/main/app.main.component';


@Component({
    selector: 'app-rightmenu',
    templateUrl: './app.rightmenu.component.html'
})
export class AppRightMenuComponent {
    constructor(public appMain: AppMainComponent, public app: AppComponent) {}
}
