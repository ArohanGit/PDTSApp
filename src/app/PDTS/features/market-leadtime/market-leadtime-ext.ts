import { MarketLeadtime } from "../../domain/market-leadtime";

export interface MarketLeadtimeExt extends MarketLeadtime {
    FactoryName: string
    Factoryleadtime: number;
    Productleadtime: number;
    FactoryID: number;
    ProductID: number; 
}