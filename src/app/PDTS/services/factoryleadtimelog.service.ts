import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppEnvironmentConfigService } from 'src/app/core/services/app.environment-config.service';
import { FactoryLeadtimeLog } from '../domain/factory-leadtime-log';


@Injectable()
export class FactoryLeadtimeLogService {
    api: any = [];
    constructor(private http: HttpClient,
        private environment: AppEnvironmentConfigService) {
        this.api = environment.config;
    }

    getDTO() {
        return this.http.get<any>(this.api.url + 'FactoryLeadtimeLog/DTO')
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

    get() {
        return this.http.get<any>(this.api.url + 'FactoryLeadtimeLog')
            .toPromise()
            .then(res => res.Items as any[])
            .then(data => data);
    }

    Load(FactoryLeadtimeLogID) {
        return this.http.get<any>(this.api.url + 'FactoryLeadtimeLog/Load/' + (typeof (FactoryLeadtimeLogID) === 'number' ? FactoryLeadtimeLogID.toString() : FactoryLeadtimeLogID))
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

    LoadList(oFactoryLeadtimeLog: FactoryLeadtimeLog) {
        return this.http.post<any>(this.api.url + 'FactoryLeadtimeLog/LoadList', oFactoryLeadtimeLog)
            .toPromise()
            .then(res => res.Items as any[])
            .then(data => data);
    }

    save(oFactoryLeadtimeLog: FactoryLeadtimeLog) {
        return this.http.post<any>(this.api.url + 'FactoryLeadtimeLog', oFactoryLeadtimeLog)
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

    saveList(oFactoryLeadtimeLogList: FactoryLeadtimeLog[]) {
        return this.http.post<any>(this.api.url + 'FactoryLeadtimeLog/SaveList', oFactoryLeadtimeLogList)
            .toPromise()
            .then(res => res.Items as any[])
            .then(data => data);
    }

    delete(FactoryLeadtimeLogID) {
        return this.http.delete<any>(this.api.url + 'FactoryLeadtimeLog/' + (typeof (FactoryLeadtimeLogID) === 'number' ? FactoryLeadtimeLogID.toString() : FactoryLeadtimeLogID))
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

    validate(oFactoryLeadtimeLog: FactoryLeadtimeLog) {
        return this.http.post<any>(this.api.url + 'FactoryLeadtimeLog/Validate', oFactoryLeadtimeLog)
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }
}
