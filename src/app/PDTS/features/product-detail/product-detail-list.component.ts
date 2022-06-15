import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DestroyService } from '../../services/destroy.service';
import { SelectionService } from '../../services/selection.service';
import { ProductDetail } from '../../domain/product-detail';
import { Product } from 'src/assets/demo/applicationservice';
import { ProductDetailService } from '../../services/productdetail.service';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'product-detail-list',
    templateUrl: './product-detail-list.component.html',
    providers: [DestroyService]
})
export class ProductDetailListComponent implements OnInit {
    @Output() onAdd = new EventEmitter<ProductDetail>();
    @Output() onEdit = new EventEmitter<ProductDetail>();
    @Output() onChange = new EventEmitter<any>();

   
    _list: ProductDetail[] = [];
    get list(): ProductDetail[] {
        return this._list;
    }
    @Input() set list(value: ProductDetail[]) {
        this._list = [...value];
        this.joinMasters();
    }

    private productdetailDTO = {} as ProductDetail;

    // Masters wrt foreign keys.
    private product: ProductDetail[] = [];
    productList: Product[];
    
    //selectedList: any = null;
    private selectedItem = {} as  Product;

    constructor(
        private productdetailService: ProductDetailService,
        private productService: ProductService,
        private selectionService: SelectionService,
        private readonly destroy$: DestroyService,
    ) { }

    ngOnInit() {
        combineLatest([
            this.productdetailService.getDTO(),
            this.productService.get(),
            
        ])
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                ([productdetailDTO, productList]) => {
                    this.productdetailDTO = {...this.productdetailDTO, ...productdetailDTO};
                    this.productList = [...productList];
                    // this.selectedItem = this.productList[0];
                    this.joinMasters();
                }
                , error => console.log('Could not load!')
            );
    }

    onAddClick() {
        // const useraccess = this.useraccessDTO;
        // this.selectionService.selectedUserAccess = useraccess;
        // this.onAdd.emit(useraccess);
    }

    onEditClick(productdetail: ProductDetail) {
        productdetail = { ...productdetail };
         this.selectionService.selectedProductDetail = productdetail;
         this.onEdit.emit(productdetail);
    }

    onProductSelect(e) {
        debugger;
        if (!e) return;
        this.onChange.emit(e);
        
    }


    joinMasters() {
        // Join masters with respect to foreign keys. 
       
    }
}
