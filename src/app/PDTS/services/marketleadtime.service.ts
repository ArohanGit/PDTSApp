import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppEnvironmentConfigService } from 'src/app/core/services/app.environment-config.service';
import { MarketLeadtime } from '../domain/market-leadtime';


@Injectable()
export class MarketLeadtimeService {
    api: any = {};

    constructor(
        private http: HttpClient, private environment: AppEnvironmentConfigService
    ) {
        this.api = environment.config;
    }

    getDTO() {
        return this.http.get<any>(this.api.url + 'MarketLeadtime/DTO')
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

    get() {
        debugger;
        return this.http.get<any>(this.api.url + 'MarketLeadtime')
            .toPromise()
            .then(res => res.Items as any)
            .then(data => data);
    }

    getmarketleadtime() {
        debugger;
        return this.http.get<any>(this.api.url + 'MarketLeadtime/GetMarketLeadtime' )
            .toPromise()
            .then(res => res.Items as any)
            .then(data => data);
    }

    getproduct() {
        debugger;
        return this.http.get<any>(this.api.url + 'MarketLeadtime/GetProduct' )
            .toPromise()
            .then(res => res.Items as any)
            .then(data => data);
    }

    getleadtimescope() {
        debugger;
        return this.http.get<any>(this.api.url + 'MarketLeadtime/GetLeadtimeScope' )
            .toPromise()
            .then(res => res.Items as any)
            .then(data => data);
    }


    

    save(oMarketleadtime: MarketLeadtime) {
        return this.http.post<any>(this.api.url + 'MarketLeadtime', oMarketleadtime)
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

}
