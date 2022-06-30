import { MarketLeadtime } from "../../domain/market-leadtime";

export interface MarketLeadtimeExt extends MarketLeadtime {
    ProductName: string;
    FactoryName: string;
    Factoryleadtime: number;
    FactoryID: number;
    ProductID: number; 
    Requestedleadtime: number;
}