import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DestroyService } from '../../services/destroy.service';
import { SelectionService } from '../../services/selection.service';
import { MarketLeadtimeService } from '../../services/marketleadtime.service';
import { LeadtimeScopeExt } from './leadtime-scope-ext';

@Component({
    selector: 'leadtime-scopes-list',
    templateUrl: './leadtime-scopes-list.component.html',
    providers: [DestroyService]
})
export class LeadtimeScopesListComponent implements OnInit {
    @Output() onComboSelected = new EventEmitter<LeadtimeScopeExt>();
   

   
    _list: LeadtimeScopeExt[] = [];
    get list(): LeadtimeScopeExt[] {
        return this._list;
    }
    @Input() set list(value: LeadtimeScopeExt[]) {
        this._list = [...value];
        this.joinMasters();
    }

    private leadtimescopeDTO = {} as LeadtimeScopeExt;

    

    constructor(
        private marketleadtimeService: MarketLeadtimeService,
        private selectionService: SelectionService,
        private readonly destroy$: DestroyService,
    ) { }

    ngOnInit() {
        combineLatest([
            this.marketleadtimeService.getDTO(),
            
        ])
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                ([leadtimescopeDTO]) => {
                    this.leadtimescopeDTO = {...this.leadtimescopeDTO, ...leadtimescopeDTO};
                    this.joinMasters();
                }
                , error => console.log('Could not load!')
            );
    }

      
    joinMasters() {
        // Join masters with respect to foreign keys. 
       
    }
}
