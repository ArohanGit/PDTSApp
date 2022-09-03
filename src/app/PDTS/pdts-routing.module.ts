import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAuthGuardService } from '../core/guards/app.authguard.service';
import { DashboardComponent } from './features/dashboard.component';
import { FactoryScopesPageComponent } from './features/factory-scopes/factory-scopes-page.component';
import { LeadtimeScopesPageComponent } from './features/leadtime-scopes/leadtime-scopes-page.component';
import { MarketLeadtimePageComponent } from './features/market-leadtime/market-leadtime-page.component';
import { ProductDetailPageComponent } from './features/product-detail/product-detail-page.component';
import { RolePageComponent } from './features/role/role-page.component';
import { UserPageComponent } from './features/user/user-page.component';



const routes: Routes = [
    // { path: '', component: AppHomeComponent, canActivate: [AppAuthGuardService] },
    { path: '', component: DashboardComponent, canActivate: [AppAuthGuardService] },
    { path: 'PDTS/factory-scopes-page', component: FactoryScopesPageComponent, canActivate: [AppAuthGuardService] },
    { path: 'PDTS/product-detail-page', component: ProductDetailPageComponent, canActivate: [AppAuthGuardService] },
    { path: 'PDTS/market-leadtime-page', component: MarketLeadtimePageComponent, canActivate: [AppAuthGuardService] },
    { path: 'PDTS/leadtime-scopes-page', component: LeadtimeScopesPageComponent, canActivate: [AppAuthGuardService] },
    { path: 'PDTS/user-page', component: UserPageComponent, canActivate: [AppAuthGuardService] },
    { path: 'PDTS/role-page', component: RolePageComponent, canActivate: [AppAuthGuardService] }
       
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PDTSRoutingModule {
}
