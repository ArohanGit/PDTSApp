import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppEnvironmentConfigService } from 'src/app/core/services/app.environment-config.service';
import { ProductDetail } from '../domain/product-detail';


@Injectable()
export class ProductDetailService {
    api: any = {};

    constructor(
        private http: HttpClient, private environment: AppEnvironmentConfigService
    ) {
        this.api = environment.config;
    }

    getDTO() {
        return this.http.get<any>(this.api.url + 'ProductDetail/DTO')
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

    get() {
        return this.http.get<any>(this.api.url + 'ProductDetail')
            .toPromise()
            .then(res => res.Items as any)
            .then(data => data);
    }


    save(oProductDetail: ProductDetail) {
        return this.http.post<any>(this.api.url + 'ProductDetail', oProductDetail)
            .toPromise()
            .then(res => res as any)
            .then(data => data);
    }

}
