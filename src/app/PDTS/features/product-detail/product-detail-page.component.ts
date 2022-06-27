import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { ProductDetail } from "../../domain/product-detail";
import { ProductDetailService } from "../../services/productdetail.service";



@Component({
    selector: 'product-detail-scopes-page',
    templateUrl: './product-detail-page.component.html',
    providers: [MessageService]
})
export class ProductDetailPageComponent implements OnInit {
    public ProductDetailDialog = false;

    productdetailList: ProductDetail[] = [];
    productdetailFilterList: ProductDetail[] = [];
    productdetailFormData: ProductDetail = {} as ProductDetail;

    constructor(private router: Router,
        private messageService: MessageService,
        private productdetailService: ProductDetailService) {
    }

    ngOnInit(): void {
        this.productdetailService.get().then(l => {
            this.productdetailList = l;
        });

    }
    onEdit($event) {
        this.productdetailFormData = { ...$event };
        this.ProductDetailDialog = true;
    }

    onHide($event) {
        this.ProductDetailDialog = false;
    }

    onSave($event) {
        this.productdetailService.save($event).then(u => {
            
            const i = this.productdetailFilterList.findIndex(p => p.ProductDetailID === u.ProductDetailID);
            if (i >= 0) {
                this.productdetailFilterList[i] = { ...u };
            }
            else {
                this.productdetailFilterList.push(u);
            }
            this.productdetailFilterList = [...this.productdetailFilterList]
        });
        this.ProductDetailDialog = false;
    }

    onChange($event){
        debugger;
        const l  = [...this.productdetailList.filter(d => d.ProductID === $event.value)];
        this.productdetailFilterList = [...l];
        
        }
    


}