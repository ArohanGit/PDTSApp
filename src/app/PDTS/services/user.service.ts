import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppEnvironmentConfigService } from 'src/app/core/services/app.environment-config.service';
import { User } from '../domain/user';

@Injectable()
export class UserService {
    api: any = [];
    constructor(private http: HttpClient,
        private environment: AppEnvironmentConfigService) {
        this.api = environment.config;
    }

    getDTO() {
        return this.http.get<any>(this.api.url + 'User/DTO')
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

    get() {
        return this.http.get<any>(this.api.url + 'User')
            .toPromise()
            .then(res => res.Items as any[])
            .then(data => data);
    }

    Load(UserId) {
        return this.http.get<any>(this.api.url + 'User/Load/' + (typeof (UserId) === 'number' ? UserId.toString() : UserId))
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

    LoadList(oUser: User) {
        return this.http.post<any>(this.api.url + 'User/LoadList', oUser)
            .toPromise()
            .then(res => res.Items as any[])
            .then(data => data);
    }

    save(oUser: User) {
        return this.http.post<any>(this.api.url + 'User', oUser)
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

    saveList(oUserList: User[]) {
        return this.http.post<any>(this.api.url + 'User/SaveList', oUserList)
            .toPromise()
            .then(res => res.Items as any[])
            .then(data => data);
    }

    delete(UserId) {
        return this.http.delete<any>(this.api.url + 'User/' + (typeof (UserId) === 'number' ? UserId.toString() : UserId))
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

    validate(oUser: User) {
        return this.http.post<any>(this.api.url + 'User/Validate', oUser)
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

    getUserInfo() {
        return this.http.get<any>(this.api.url + 'User/GetUserInfo')
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }
}
