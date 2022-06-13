import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAuthGuardService } from '../core/guards/app.authguard.service';
import { DashboardComponent } from './features/dashboard.component';
import { FactoryPageComponent } from './features/factory/factory-page.component';


const routes: Routes = [
    // { path: '', component: AppHomeComponent, canActivate: [AppAuthGuardService] },
    { path: '', component: DashboardComponent, canActivate: [AppAuthGuardService] },
    { path: 'PDTS/factory-page', component: FactoryPageComponent, canActivate: [AppAuthGuardService] },
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PDTSRoutingModule {
}
