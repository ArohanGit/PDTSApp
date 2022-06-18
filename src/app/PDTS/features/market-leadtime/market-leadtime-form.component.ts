import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MessageService } from "primeng/api";
import { combineLatest } from "rxjs/internal/observable/combineLatest";
import { takeUntil } from "rxjs/operators";
import { MarketLeadtime } from "../../domain/market-leadtime";
import { DestroyService } from "../../services/destroy.service";
import { MarketLeadtimeExt } from "./market-leadtime-ext";

@Component({
    selector: 'market-leadtime-form',
    templateUrl: './market-leadtime-form.component.html',
    providers: [MessageService, DestroyService]
})
export class MarketLeadtimeFormComponent implements OnInit {
    @Output() onSave = new EventEmitter<MarketLeadtime>();
    @Output() onCancel = new EventEmitter();

    public formData: MarketLeadtimeExt;
    submitted: boolean;

    _data: MarketLeadtimeExt;
    get data(): MarketLeadtimeExt {
        return this._data;
    }
    @Input() set data(value: MarketLeadtimeExt) {
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