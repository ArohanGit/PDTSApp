import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DestroyService } from '../../services/destroy.service';
import { SelectionService } from '../../services/selection.service';
import { MarketLeadtimeService } from '../../services/marketleadtime.service';
import { LeadtimeScopeExt } from './leadtime-scope-ext';
import { Factory } from '../../domain/factory';
import { FactoryService } from '../../services/factory.service';
import { FactoryScope } from '../../domain/factory-scope';

@Component({
    selector: 'leadtime-scopes-list',
    templateUrl: './leadtime-scopes-list.component.html',
    providers: [DestroyService]
})
export class LeadtimeScopesListComponent implements OnInit {
    @Output() onChange = new EventEmitter<any>();
    @Output() onExportExcel = new EventEmitter();
    @Output() onSave = new EventEmitter<any>();

   
    _list: FactoryScope[] = [];
    get list(): FactoryScope[] {
        return this._list;
    }
    @Input() set list(value: FactoryScope[]) {
        this._list = [...value];
        this.joinMasters();
    }

    private leadtimescopeDTO = {} as LeadtimeScopeExt;
    factoryList: Factory[];
    

    constructor(
        private marketleadtimeService: MarketLeadtimeService,
        private selectionService: SelectionService,
        private readonly destroy$: DestroyService,
        private factoryService: FactoryService,
    ) { }

    ngOnInit() {
        combineLatest([
            this.marketleadtimeService.getDTO(),
            this.factoryService.get(),
            
        ])
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                ([leadtimescopeDTO, factoryList]) => {
                    this.leadtimescopeDTO = {...this.leadtimescopeDTO, ...leadtimescopeDTO};
                    this.factoryList = [...factoryList];
                    this.joinMasters();
                }
                , error => console.log('Could not load!')
            );
    }

    onFactorySelect(e) {
        debugger;
        if (!e) return;
        this.onChange.emit(e);
        
    }

    exportExcel() {
        this.onExportExcel.emit();
    }

    onSaveClick(){
        this.onSave.emit()
    }
      
    joinMasters() {
        // Join masters with respect to foreign keys. 
       
    }
}
