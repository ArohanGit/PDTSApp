import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuardService } from './core/guards/app.authguard.service';
import { AppMainComponent } from './core/layouts/main/app.main.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppLoginComponent } from './pages/app.login.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';

// Whenever Feature is added add routes in following array
const featureRoutes: Routes = [
    {
        path: '', component: AppMainComponent,
        children: [
            { path: '', loadChildren: () => import('./PDTS/pdts.module').then(m => m.PDTSModule) }
        ],
        canActivate: [AppAuthGuardService]
    },
    {
        path: 'shared', component: AppMainComponent,
        children: [
            { path: '', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) }
        ],
        canActivate: [AppAuthGuardService]
    },
]

// Whenever common page is added add route in following array.
const routes: Routes = [
    ...featureRoutes,
    ...[
        { path: 'error', component: AppErrorComponent },
        { path: 'access', component: AppAccessdeniedComponent },
        { path: 'notfound', component: AppNotfoundComponent },
        { path: 'login', component: AppLoginComponent },
        { path: '**', redirectTo: '/notfound' }
    ]
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
