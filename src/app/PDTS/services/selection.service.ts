import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Factory } from '../domain/factory';


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

   
}
