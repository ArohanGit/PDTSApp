import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MessageService } from "primeng/api";
import { combineLatest } from "rxjs/internal/observable/combineLatest";
import { takeUntil } from "rxjs/operators";
import { FactoryScope } from "../../domain/factory-scope";
import { DestroyService } from "../../services/destroy.service";

@Component({
    selector: 'factory-scopes-form',
    templateUrl: './factory-scopes-form.component.html',
    providers: [MessageService, DestroyService]
})
export class FactoryScopesFormComponent implements OnInit {
    @Output() onSave = new EventEmitter<FactoryScope>();
    @Output() onCancel = new EventEmitter();

    public formData: FactoryScope;
    submitted: boolean;

    _data: FactoryScope;
    get data(): FactoryScope {
        return this._data;
    }
    @Input() set data(value: FactoryScope) {
        this._data = { ...value };
        this.formData = { ...this.formData, ...this.data };
        // Update Form Data to be displayed on form.
        //this.updateFormData();
    }
    constructor(private messageService: MessageService,
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
        //if (!this.isValid()) return;
        this.onSave.emit(this.formData);
    }

    isValid(): boolean {
        return true;
    }

}