import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Factory } from '../domain/factory';
import { FactoryLeadtimeLog } from '../domain/factory-leadtime-log';
import { FactoryScope } from '../domain/factory-scope';
import { MarketLeadtime } from '../domain/market-leadtime';
import { ProductDetail } from '../domain/product-detail';
import { Role } from '../domain/role';
import { User } from '../domain/user';
import { MarketLeadtimeExt } from '../features/market-leadtime/market-leadtime-ext';


@Injectable({
    providedIn: 'root'
})
export class SelectionService {
    constructor() { }

   

    private FactorySelected: BehaviorSubject<Factory> = new BehaviorSubject<any>(null);
    public selectedFactory$ = this.FactorySelected.asObservable();
    public set selectedFactory(value: Factory) {
        this.FactorySelected.next(value);
    }

    private FactoryScopeSelected: BehaviorSubject<FactoryScope> = new BehaviorSubject<any>(null);
    public selectedFactoryScope$ = this.FactoryScopeSelected.asObservable();
    public set selectedFactoryScope(value: FactoryScope) {
        this.FactoryScopeSelected.next(value);
    }

    private ProductDetailSelected: BehaviorSubject<ProductDetail> = new BehaviorSubject<any>(null);
    public selectedProductDetail$ = this.ProductDetailSelected.asObservable();
    public set selectedProductDetail(value: ProductDetail) {
        this.ProductDetailSelected.next(value);
    }

    private MarketLeadTimeSelected: BehaviorSubject<MarketLeadtimeExt> = new BehaviorSubject<any>(null);
    public selectedMarketLeadTime$ = this.MarketLeadTimeSelected.asObservable();
    public set selectedMarketLeadTime(value: MarketLeadtimeExt) {
        this.MarketLeadTimeSelected.next(value);
    }

    private UserSelected: BehaviorSubject<User> = new BehaviorSubject<any>(null);
    public selectedUser$ = this.UserSelected.asObservable();
    public set selectedUser(value: User) {
        this.UserSelected.next(value);
    }

    private RoleSelected: BehaviorSubject<Role> = new BehaviorSubject<any>(null);
    public selectedRole$ = this.RoleSelected.asObservable();
    public set selectedRole(value: Role) {
        this.RoleSelected.next(value);
    }

    private FactoryLeadtimeLogSelected: BehaviorSubject<FactoryLeadtimeLog> = new BehaviorSubject<any>(null);
    public selectedFactoryLeadtimeLog$ = this.FactoryLeadtimeLogSelected.asObservable();
    public set selectedFactoryLeadtimeLog(value: FactoryLeadtimeLog) {
        this.FactoryLeadtimeLogSelected.next(value);
    }

   
}
