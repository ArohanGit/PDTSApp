import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../domain/user';
import { DestroyService } from '../../services/destroy.service';
import { RoleService } from '../../services/role.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'user-page',
    templateUrl: './user-page.component.html',
    providers: [MessageService, DestroyService]
})
export class UserPageComponent implements OnInit {
    user: User= {} as User;
    userList: User[] = [];
    
    displayUserModal = false;
    title = 'User';

    
    constructor(
        private messageService: MessageService,
        private userService: UserService,
        private readonly destroy$: DestroyService,
    ) {
    }

     ngOnInit() {
        this.user = {} as User;

        // Init
        combineLatest([
            this.userService.get()
        ])
        .pipe(takeUntil(this.destroy$))
            .subscribe(
                ([userList]) => {
                    this.userList = [...userList];
                }
                , error => console.log('Could not load!')
            );
    }


    onAdd() {
        this.user = {} as User;
        this.user.IsLeft = "N";
        this.title = 'Add New';
        this.displayUserModal = true;
    }

    onEdit(user) {
        debugger;
        this.user = { ...user };
        this.title = 'Edit "' + this.user.Name + '" User';
        //this.selectedRole = this.roleList.find(r => r.RoleID === this.user.RoleID);
        this.displayUserModal = true;
    }

    onSave($event) {
        debugger;
        // Update Role
        
        this.userService.save($event).then(u => {
            this.displayUserModal = false;
            // Update List
            const i = this.userList.findIndex(p => p.UserID === u.UserID);
            if (i >= 0) {
                this.userList[i] = { ...u };
            }
            else {
                this.userList.push(u);
            }
            this.userList = [...this.userList]

            // Show Message
            this.messageService.add({ key: 'tr', severity: 'success', summary: 'Saved successfully', detail: '' });
        });
    }

    onCancel() {
        this.displayUserModal = false;
    }

}
