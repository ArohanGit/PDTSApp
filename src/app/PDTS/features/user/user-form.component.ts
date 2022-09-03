import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MessageService } from "primeng/api";
import { combineLatest } from "rxjs/internal/observable/combineLatest";
import { takeUntil } from "rxjs/operators";
import { Role } from "../../domain/role";
import { User } from "../../domain/user";
import { DestroyService } from "../../services/destroy.service";
import { RoleService } from "../../services/role.service";

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    providers: [MessageService, DestroyService]
})
export class UserFormComponent implements OnInit {
    @Output() onSave = new EventEmitter<User>();
    @Output() onCancel = new EventEmitter();

    public formData: User;
    submitted: boolean;
    
    roleList: Role[];

    _data: User;
    get data(): User {
        return this._data;
    }
    @Input() set data(value: User) {
        this._data = { ...value };
        this.formData = { ...this.formData, ...this.data };
        // Update Form Data to be displayed on form.
        //this.updateFormData();
    }
    constructor(private messageService: MessageService,
        private roleService: RoleService,
        private readonly destroy$: DestroyService,) { }

    ngOnInit() {
        combineLatest([
            this.roleService.get(),

        ])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([roleList]) => {
                // Load Masters only if required.
                this.roleList = [...roleList];
            }
                , error => console.log('Could not load!')
            );
    }

    
    onCancelClick() {
        this.onCancel.emit();
    }

    onSaveClick() {
        this.submitted = true;
          this.onSave.emit(this.formData);
    }

    isValid() {
        return (
            !this.formData.Name ||
            !this.formData.WebUserID ||
            !this.formData.EMailAddress ||
            !this.validateEmail(this.formData.EMailAddress)
        );
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}