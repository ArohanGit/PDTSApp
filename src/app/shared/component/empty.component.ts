import {Component} from '@angular/core';
import { AppBreadcrumbService } from 'src/app/core/services/app.breadcrumb.service';


@Component({
    templateUrl: './empty.component.html'
})
export class EmptyComponent {

    constructor(private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Pages' },
            { label: 'Empty Page', routerLink: ['/shared/empty'] }
        ]);
    }
}
