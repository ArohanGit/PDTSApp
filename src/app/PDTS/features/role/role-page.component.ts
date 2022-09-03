import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Role } from '../../domain/role';
import { User } from '../../domain/user';
import { DestroyService } from '../../services/destroy.service';
import { RoleService } from '../../services/role.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'role-page',
    templateUrl: './role-page.component.html',
    providers: [MessageService, DestroyService]
})
export class RolePageComponent implements OnInit {
    role: Role= {} as Role;
    roleList: Role[] = [];
    
    displayRoleModal = false;
    title = 'User';

    
    constructor(
        private messageService: MessageService,
        private roleService: RoleService,
        private readonly destroy$: DestroyService,
    ) {
    }

     ngOnInit() {
        this.role = {} as Role;

        // Init
        combineLatest([
            this.roleService.get()
        ])
        .pipe(takeUntil(this.destroy$))
            .subscribe(
                ([roleList]) => {
                    this.roleList = [...roleList];
                }
                , error => console.log('Could not load!')
            );
    }


    onAdd() {
        this.role = {} as Role;
        this.title = 'Add New';
        this.displayRoleModal = true;
    }

    onEdit(role) {
        debugger;
        this.role = { ...role };
        this.title = 'Edit "' + this.role.Name;
        //this.selectedRole = this.roleList.find(r => r.RoleID === this.user.RoleID);
        this.displayRoleModal = true;
    }

    onSave($event) {
        debugger;
        // Update Role
        
        this.roleService.save($event).then(u => {
            this.displayRoleModal = false;
            // Update List
            const i = this.roleList.findIndex(p => p.RoleID === u.RoleID);
            if (i >= 0) {
                this.roleList[i] = { ...u };
            }
            else {
                this.roleList.push(u);
            }
            this.roleList = [...this.roleList]

            // Show Message
            this.messageService.add({ key: 'tr', severity: 'success', summary: 'Saved successfully', detail: '' });
        });
    }

    onCancel() {
        this.displayRoleModal = false;
    }

}
