import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Role } from '../../domain/role';
import { User } from '../../domain/user';
import { DestroyService } from '../../services/destroy.service';
import { RoleService } from '../../services/role.service';
import { SelectionService } from '../../services/selection.service';
import { UserService } from '../../services/user.service';


@Component({
    selector: 'role-list',
    templateUrl: './role-list.component.html',
    providers: [DestroyService]
})
export class RoleListComponent implements OnInit {
    @Output() onAdd = new EventEmitter<Role>();
    @Output() onEdit = new EventEmitter<Role>();


    _list: Role[] = [];
    get list(): Role[] {
        return this._list;
    }
    @Input() set list(value: Role[]) {
        this._list = [...value];
        this.joinMasters(this._list);
    }

    private roleDTO = {} as Role;

    // Masters wrt foreign keys.

    constructor(
        private roleService: RoleService,
        private selectionService: SelectionService,
        private readonly destroy$: DestroyService,
    ) { }

    ngOnInit() {
        combineLatest([
            this.roleService.getDTO(),
          
        ])
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                ([roleDTO]) => {
                    this.roleDTO = { ...this.roleDTO, ...roleDTO };
                    // this.selectedItem = this.productList[0];
                }
                , error => console.log('Could not load!')
            );
    }

    onAddClick() {
        const role = this.roleDTO;
        this.selectionService.selectedRole = role;
        this.onAdd.emit(role);
    }

    onEditClick(role: Role) {
        role = { ...role };
        this.selectionService.selectedRole = role;
        this.onEdit.emit(role);
    }


    joinMasters(list) {
        // Join masters with respect to foreign keys. 
        list.forEach((l) => {
        });
    }

}
