import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppEnvironmentConfigService } from 'src/app/core/services/app.environment-config.service';
import { FactoryScope } from '../domain/factory-scope';


@Injectable()
export class FactoryScopesService {
    api: any = {};

    constructor(
        private http: HttpClient, private environment: AppEnvironmentConfigService
    ) {
        this.api = environment.config;
    }

    getDTO() {
        return this.http.get<any>(this.api.url + 'FactoryScope/DTO')
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

    get() {
        debugger;
        return this.http.get<any>(this.api.url + 'FactoryScope')
            .toPromise()
            .then(res => res.Items as any)
            .then(data => data);
    }

    save(oFactoryScope: FactoryScope) {
        return this.http.post<any>(this.api.url + 'FactoryScope', oFactoryScope)
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

}
