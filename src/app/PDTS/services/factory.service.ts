import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppEnvironmentConfigService } from 'src/app/core/services/app.environment-config.service';
import { Factory } from '../domain/factory';


@Injectable()
export class FactoryService {
    api: any = {};

    constructor(
        private http: HttpClient, private environment: AppEnvironmentConfigService
    ) {
        this.api = environment.config;
    }

    getDTO() {
        return this.http.get<any>(this.api.url + 'Factory/DTO')
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

    get() {
        debugger;
        return this.http.get<any>(this.api.url + 'Factory')
            .toPromise()
            .then(res => res.Items as any)
            .then(data => data);
    }

    save(oFactory: Factory) {
        return this.http.post<any>(this.api.url + 'Factory', oFactory)
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

}
