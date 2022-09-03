import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MessageService } from "primeng/api";
import { combineLatest } from "rxjs/internal/observable/combineLatest";
import { takeUntil } from "rxjs/operators";
import { Role } from "../../domain/role";
import { DestroyService } from "../../services/destroy.service";
import { RoleService } from "../../services/role.service";

@Component({
    selector: 'role-form',
    templateUrl: './role-form.component.html',
    providers: [MessageService, DestroyService]
})
export class RoleFormComponent implements OnInit {
    @Output() onSave = new EventEmitter<Role>();
    @Output() onCancel = new EventEmitter();

    public formData: Role;
    submitted: boolean;
    
  
    _data: Role;
    get data(): Role {
        return this._data;
    }
    @Input() set data(value: Role) {
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
           

        ])
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                // Load Masters only if required.
                
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
            !this.formData.Name 
          );
    }

}