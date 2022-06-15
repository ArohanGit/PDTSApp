import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DestroyService } from '../../services/destroy.service';
import { SelectionService } from '../../services/selection.service';
import { FactoryScope } from '../../domain/factory-scope';
import { FactoryScopesService } from '../../services/factoryscopes.service';
import { FactoryService } from '../../services/factory.service';
import { Factory } from '../../domain/factory';

@Component({
    selector: 'factory-scopes-list',
    templateUrl: './factory-scopes-list.component.html',
    providers: [DestroyService]
})
export class FactoryScopesListComponent implements OnInit {
    @Output() onAdd = new EventEmitter<FactoryScope>();
    @Output() onEdit = new EventEmitter<FactoryScope>();
    @Output() onChange = new EventEmitter<any>();

   
    _list: FactoryScope[] = [];
    get list(): FactoryScope[] {
        return this._list;
    }
    @Input() set list(value: FactoryScope[]) {
        this._list = [...value];
        this.joinMasters();
    }

    private factoryscopesDTO = {} as FactoryScope;

    // Masters wrt foreign keys.
    private factory: FactoryScope[] = [];
    factoryList: Factory[];
    

    constructor(
        private factoryscopesService: FactoryScopesService,
        private factoryService: FactoryService,
        private selectionService: SelectionService,
        private readonly destroy$: DestroyService,
    ) { }

    ngOnInit() {
        combineLatest([
            this.factoryscopesService.getDTO(),
            this.factoryService.get(),
            
        ])
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                ([factoryscopesDTO, factoryList]) => {
                    this.factoryscopesDTO = {...this.factoryscopesDTO, ...factoryscopesDTO};
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

    onEditClick(factoryscope: FactoryScope) {
         factoryscope = { ...factoryscope };
         this.selectionService.selectedFactoryScope = factoryscope;
         this.onEdit.emit(factoryscope);
    }

    onFactorySelect(e) {
        debugger;
        if (!e) return;
        this.onChange.emit(e);
        
    }


    joinMasters() {
        // Join masters with respect to foreign keys. 
       
    }
}
