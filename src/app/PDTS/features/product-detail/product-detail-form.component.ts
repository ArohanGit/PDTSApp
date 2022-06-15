import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MessageService } from "primeng/api";
import { combineLatest } from "rxjs/internal/observable/combineLatest";
import { takeUntil } from "rxjs/operators";
import { ProductDetail } from "../../domain/product-detail";
import { DestroyService } from "../../services/destroy.service";

@Component({
    selector: 'product-detail-form',
    templateUrl: './product-detail-form.component.html',
    providers: [MessageService, DestroyService]
})
export class ProductDetailFormComponent implements OnInit {
    @Output() onSave = new EventEmitter<ProductDetail>();
    @Output() onCancel = new EventEmitter();

    public formData: ProductDetail;
    submitted: boolean;

    _data: ProductDetail;
    get data(): ProductDetail {
        return this._data;
    }
    @Input() set data(value: ProductDetail) {
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