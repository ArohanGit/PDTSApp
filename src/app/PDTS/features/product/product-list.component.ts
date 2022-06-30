import { Component, Input, OnInit } from "@angular/core";
import { combineLatest } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Product } from "src/assets/demo/applicationservice";
import { DestroyService } from "../../services/destroy.service";
import { ProductService } from "../../services/product.service";
import { SelectionService } from "../../services/selection.service";

@Component({
    selector: 'market-leadtime-list',
    templateUrl: './market-leadtime-list.component.html',
    providers: [DestroyService]
})
export class ProductListComponent implements OnInit {


    _list: Product[] = [];
    get list(): Product[] {
        return this._list;
    }
    @Input() set list(value: Product[]) {
        this._list = [...value];
        this.joinMasters();
    }

    private productDTO = {} as Product;

    constructor(
        private productService: ProductService,
        private selectionService: SelectionService,
        private readonly destroy$: DestroyService,
    ) { }

    ngOnInit() {
        combineLatest([
            this.productService.getDTO(),
                
        ])
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                ([productDTO]) => {
                    this.productDTO = {...this.productDTO, ...productDTO};
                    this.joinMasters();
                }
                , error => console.log('Could not load!')
            );
    }

    joinMasters() {
        // Join masters with respect to foreign keys. 
       
    }

}