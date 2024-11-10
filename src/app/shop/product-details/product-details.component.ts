import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { error } from 'console';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!:IProduct;
  constructor(private shopService:ShopService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct()
  }
  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    
    if (id) {
        this.shopService.getProduct(+id).subscribe(
            product => {
                this.product = product;
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


