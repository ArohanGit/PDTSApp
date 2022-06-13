import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AppAuthGuardService } from '../core/guards/app.authguard.service';
import { EmptyComponent } from './component/empty.component';

const routes: Routes = [
    {path: '', component: EmptyComponent, canActivate: [ AppAuthGuardService ]}                                     
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SharedRoutingModule {
}
