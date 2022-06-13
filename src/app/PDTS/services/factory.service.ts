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

}
