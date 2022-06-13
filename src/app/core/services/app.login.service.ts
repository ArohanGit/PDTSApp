import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { AppEnvironmentConfigService } from './app.environment-config.service';

export interface LoginUser {
    userId: string;
    userName: string;
    password: string;
    RoleName: string;
}

@Injectable()
export class AppLoginService implements OnDestroy {
    subscription: Subscription;
    private loginToken = new Subject<string>();
    tokenHandler = this.loginToken.asObservable();
    LoggedInInfo: any = {};

    api: any = {};

    constructor(private http: HttpClient,
        private environment: AppEnvironmentConfigService,
        private router: Router,) {
        this.api = environment.config;
        this.subscription = this.tokenHandler.subscribe(response => {
            debugger;
            if (response === null)
                this.router.navigateByUrl('/login');
            else
                this.router.navigateByUrl('/');
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    setToken(token: string) {
        this.loginToken.next(token);
    }

    loggedIn(token: string) {
        localStorage.setItem('token', token);
        this.setToken(token);
    }

    loggedOut() {
        localStorage.removeItem('token');
        this.setToken(null);
    }

    login(credentials: any): Observable<any> {
        return this.http.post(this.api.url + 'User/Login', { UserName: credentials.userName, Password: credentials.password });
    }

    authenticate(loginCredentials: LoginUser) {
        this.login(loginCredentials).subscribe(
            ticket => {
                if (ticket) {
                    // this.loggedIn(loginInfo.ticket);
                    // localStorage.setItem('userName', loginInfo.userName);
                    // this.LoggedInInfo = loginInfo;

                    this.getLoginUserInfo(loginCredentials).subscribe(loginInfo => {
                        this.loggedIn(ticket);
                        localStorage.setItem('userName', loginInfo.Name);
                        this.LoggedInInfo.userId = loginInfo.UserID;
                        this.LoggedInInfo.UserName = loginInfo.Name;
                        this.LoggedInInfo.RoleName = loginInfo.RoleName;
                    });
                }
            }
            , err => {
            }
        );
    }

    getLoginUserInfo(loginCredentials: LoginUser): Observable<any> {
        return this.http.post(this.api.url + 'User/GetByUniqueKey', loginCredentials);
    }
}
