import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DestroyService } from '../../services/destroy.service';
import { SelectionService } from '../../services/selection.service';
import { Factory } from '../../domain/factory';
import { FactoryService } from '../../services/factory.service';

@Component({
    selector: 'factory-list',
    templateUrl: './factory-list.component.html',
    providers: [DestroyService]
})
export class FactoryListComponent implements OnInit {
    @Output() onAdd = new EventEmitter<Factory>();
    @Output() onEdit = new EventEmitter<Factory>();

   
    _list: Factory[] = [];
    get list(): Factory[] {
        return this._list;
    }
    @Input() set list(value: Factory[]) {
        this._list = [...value];
        this.joinMasters();
    }

    private useraccessDTO = {} as Factory;

    // Masters wrt foreign keys.
    private factory: Factory[] = [];
    

    constructor(
        private factoryService: FactoryService,
        private selectionService: SelectionService,
        private readonly destroy$: DestroyService,
    ) { }

    ngOnInit() {
        combineLatest([
            //this.useraccessService.getDTO(),
            
        ])
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                () => {
                    //this.useraccessDTO = useraccessDTO;
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

    onEditClick(factory: Factory) {
        // useraccess = { ...useraccess };
        // this.selectionService.selectedUserAccess = useraccess;
        // this.onEdit.emit(useraccess);
    }

    joinMasters() {
        // Join masters with respect to foreign keys. 
       
    }
}
