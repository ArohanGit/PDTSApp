import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppEnvironmentConfigService } from 'src/app/core/services/app.environment-config.service';
import { Role } from '../domain/role';

@Injectable()
export class RoleService {
    api: any = [];
    constructor(private http: HttpClient,
        private environment: AppEnvironmentConfigService) {
        this.api = environment.config;
    }

    getDTO() {
        return this.http.get<any>(this.api.url + 'Role/DTO')
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

    get() {
        return this.http.get<any>(this.api.url + 'Role')
            .toPromise()
            .then(res => res.Items as any[])
            .then(data => data);
    }

    Load(RoleId) {
        return this.http.get<any>(this.api.url + 'Role/Load/' + (typeof (RoleId) === 'number' ? RoleId.toString() : RoleId))
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

    LoadList(oRole: Role) {
        return this.http.post<any>(this.api.url + 'Role/LoadList', oRole)
            .toPromise()
            .then(res => res.Items as any[])
            .then(data => data);
    }

    save(oRole: Role) {
        return this.http.post<any>(this.api.url + 'Role', oRole)
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

    saveList(oRoleList: Role[]) {
        return this.http.post<any>(this.api.url + 'Role/SaveList', oRoleList)
            .toPromise()
            .then(res => res.Items as any[])
            .then(data => data);
    }

    delete(RoleId) {
        return this.http.delete<any>(this.api.url + 'Role/' + (typeof (RoleId) === 'number' ? RoleId.toString() : RoleId))
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

    validate(oRole: Role) {
        return this.http.post<any>(this.api.url + 'Role/Validate', oRole)
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }
}
