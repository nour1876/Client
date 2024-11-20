import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { error } from 'console';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from 'xng-breadcrumb/lib/types/breadcrumb';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!:IProduct;
  constructor(private shopService:ShopService,private activatedRoute:ActivatedRoute , private bcService :BreadcrumbService) { }

  ngOnInit(): void {
    this.loadProduct()
  }
  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    
    if (id) {
        this.shopService.getProduct(+id).subscribe(
            product => {
                this.product = product;
                this.bcService.set('@productDetails',`${product.name}`)
               
            },
            error => {
                console.log(error);
            }
        );
    } else {
        console.log('Product ID is null or invalid');
        // Optionally handle the case where ID is null, like redirecting or showing a message
    }
}

  }


