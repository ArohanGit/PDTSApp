import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DestroyService } from '../../services/destroy.service';
import { SelectionService } from '../../services/selection.service';
import { FactoryService } from '../../services/factory.service';
import { Factory } from '../../domain/factory';
import { MarketLeadtimeService } from '../../services/marketleadtime.service';
import { MarketLeadtimeExt } from './market-leadtime-ext';

@Component({
    selector: 'market-leadtime-list',
    templateUrl: './market-leadtime-list.component.html',
    providers: [DestroyService]
})
export class MarketLeadtimeListComponent implements OnInit {
    @Output() onAdd = new EventEmitter<MarketLeadtimeExt>();
    @Output() onEdit = new EventEmitter<MarketLeadtimeExt>();
    @Output() onChange = new EventEmitter<any>();
    @Output() onChangeProduct = new EventEmitter<any>();
   
      
    _list: MarketLeadtimeExt[] = [];
    get list(): MarketLeadtimeExt[] {
        return this._list;
    }
    @Input() set list(value: MarketLeadtimeExt[]) {
        this._list = [...value];
        this.joinMasters();
    }

    _moduleslist: MarketLeadtimeExt[] = [];
    get moduleslist(): MarketLeadtimeExt[] {
        return this._moduleslist;
    }
    @Input() set moduleslist(value: MarketLeadtimeExt[]) {
        this._moduleslist = [...value];
        this.joinMasters();
    }

    private marketleadtimeDTO = {} as MarketLeadtimeExt;

    // Masters wrt foreign keys.
    factoryList: Factory[];
    

    constructor(
        private marketleadtimeService: MarketLeadtimeService,
        private factoryService: FactoryService,
        private selectionService: SelectionService,
        private readonly destroy$: DestroyService,
    ) { }

    ngOnInit() {
        combineLatest([
            this.marketleadtimeService.getDTO(),
            this.factoryService.get(),
            
        ])
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                ([marketleadtimeDTO, factoryList]) => {
                    this.marketleadtimeDTO = {...this.marketleadtimeDTO, ...marketleadtimeDTO};
                    this.factoryList = [...factoryList];
                    this.joinMasters();
                }
                , error => console.log('Could not load!')
            );
    }

    onAddClick() {
        // const useraccess = this.useraccessDTO;
        // this.selectionService.selectedUserAccess = useraccess;
        // this.onAdd.emit(useraccess);
    }

    onEditClick(marketleadtime: MarketLeadtimeExt) {
        debugger;
        marketleadtime = { ...marketleadtime };
         this.selectionService.selectedMarketLeadTime = marketleadtime;
         this.onEdit.emit(marketleadtime);
    }
  
    onFactorySelect(e) {
        debugger;
        if (!e) return;
        this.onChange.emit(e);        
    }

    onProductSelect(e) {
        debugger;
        if (!e) return;
        this.onChangeProduct.emit(e);   
    }

   


    joinMasters() {
        // Join masters with respect to foreign keys. 
       
    }
}
