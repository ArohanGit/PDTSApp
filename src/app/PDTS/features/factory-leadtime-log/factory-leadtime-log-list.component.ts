import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DestroyService } from '../../services/destroy.service';
import { SelectionService } from '../../services/selection.service';
import { UserService } from '../../services/user.service';
import { FactoryLeadtimeLog } from '../../domain/factory-leadtime-log';
import { FactoryLeadtimeLogService } from '../../services/factoryleadtimelog.service';


@Component({
    selector: 'factory-leadtime-log-list',
    templateUrl: './factory-leadtime-log-list.component.html',
    providers: [DestroyService]
})
export class FactoryLeadtimeLogListComponent implements OnInit {
    @Output() onAdd = new EventEmitter<FactoryLeadtimeLog>();
    @Output() onEdit = new EventEmitter<FactoryLeadtimeLog>();


    _list: FactoryLeadtimeLog[] = [];
    get list(): FactoryLeadtimeLog[] {
        return this._list;
    }
    @Input() set list(value: FactoryLeadtimeLog[]) {
        this._list = [...value];
        this.joinMasters(this._list);
    }

    private factoryLeadtimeLogDTO = {} as FactoryLeadtimeLog;

    // Masters wrt foreign keys.

    
    private userList: any = [];
    constructor(
        private userService: UserService,
        private factoryLeadtimeLog: FactoryLeadtimeLogService,
        private selectionService: SelectionService,
        private readonly destroy$: DestroyService,
    ) { }

    ngOnInit() {
        combineLatest([
            this.factoryLeadtimeLog.getDTO(),
            this.userService.get(),

        ])
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                ([factoryLeadtimeLogDTO, userList]) => {
                    this.factoryLeadtimeLogDTO = { ...this.factoryLeadtimeLogDTO, ...factoryLeadtimeLogDTO };
                    this.userList = [...userList];
                    // this.selectedItem = this.productList[0];
                }
                , error => console.log('Could not load!')
            );
    }

    onAddClick() {
        const factroryleadtimelog = this.factoryLeadtimeLogDTO;
        this.selectionService.selectedFactoryLeadtimeLog = factroryleadtimelog;
        this.onAdd.emit(factroryleadtimelog);
    }

    onEditClick(factroryleadtimelog: FactoryLeadtimeLog) {
        factroryleadtimelog = { ...factroryleadtimelog };
        this.selectionService.selectedFactoryLeadtimeLog = factroryleadtimelog;
        this.onEdit.emit(factroryleadtimelog);
    }


    joinMasters(list) {
        // Join masters with respect to foreign keys. 
        list.forEach((l) => {
            this.updateExtendedData(l);
        });
    }

    updateExtendedData(o: FactoryLeadtimeLog) {
        debugger;
        let m = this.userList.find(f => f.UserID === o.UserID);

        if (m) {
            o.UserName = m.Name;
        }
    }
}
