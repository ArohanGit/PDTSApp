import { MarketLeadtime } from "../../domain/market-leadtime";

export interface LeadtimeScopeExt extends MarketLeadtime {
    Weeks: string
    Weeks1: number;
    Weeks2: number;
    WeeksColor: string;
    Weeks1Color: string;
    Weeks2Color: string;
    FactoryID: number;
}