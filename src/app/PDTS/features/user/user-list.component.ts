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
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    providers: [DestroyService]
})
export class UserListComponent implements OnInit {
    @Output() onAdd = new EventEmitter<User>();
    @Output() onEdit = new EventEmitter<User>();


    _list: User[] = [];
    get list(): User[] {
        return this._list;
    }
    @Input() set list(value: User[]) {
        this._list = [...value];
        this.joinMasters(this._list);
    }

    private userDTO = {} as User;

    // Masters wrt foreign keys.

    
    private roleList: any = [];
    constructor(
        private userService: UserService,
        private roleService: RoleService,
        private selectionService: SelectionService,
        private readonly destroy$: DestroyService,
    ) { }

    ngOnInit() {
        combineLatest([
            this.userService.getDTO(),
            this.roleService.get(),

        ])
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                ([userDTO, roleList]) => {
                    this.userDTO = { ...this.userDTO, ...userDTO };
                    this.roleList = [...roleList];
                    // this.selectedItem = this.productList[0];
                }
                , error => console.log('Could not load!')
            );
    }

    onAddClick() {
        const user = this.userDTO;
        this.selectionService.selectedUser = user;
        this.onAdd.emit(user);
    }

    onEditClick(user: User) {
        user = { ...user };
        this.selectionService.selectedUser = user;
        this.onEdit.emit(user);
    }


    joinMasters(list) {
        // Join masters with respect to foreign keys. 
        list.forEach((l) => {
            this.updateExtendedData(l);
        });
    }

    updateExtendedData(o: User) {
        debugger;
        let m = this.roleList.find(f => f.RoleID === o.RoleID);

        if (m) {
            o.RoleName = m.Name;
        }
    }
}
