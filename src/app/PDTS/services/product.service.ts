import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppEnvironmentConfigService } from 'src/app/core/services/app.environment-config.service';
import { Product } from 'src/assets/demo/applicationservice';


@Injectable()
export class ProductService {
    api: any = {};

    constructor(
        private http: HttpClient, private environment: AppEnvironmentConfigService
    ) {
        this.api = environment.config;
    }

    getDTO() {
        return this.http.get<any>(this.api.url + 'Product/DTO')
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

    get() {
        debugger;
        return this.http.get<any>(this.api.url + 'Product')
            .toPromise()
            .then(res => res.Items as any)
            .then(data => data);
    }

    save(oProduct: Product) {
        return this.http.post<any>(this.api.url + 'Product', oProduct)
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

}
