import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
// import { AsAuthService } from './as-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppAuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const url: string = state.url;

    if (localStorage.getItem('token') ) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigateByUrl('/login');
     //this.router.navigateByUrl('/home');
    return false;
  }
}

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class AppPendingChangesGuardService implements CanDeactivate<ComponentCanDeactivate> {

  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    if (component.canDeactivate()) {
      return true;
    } else {
      if (confirm('You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.')) {
        return true;
      } else {
        return false;
      }
    }
  }
}
