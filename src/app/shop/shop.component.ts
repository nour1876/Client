import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/models/product';
import { error } from 'console';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/type';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
 products:IProduct[]=[];
 brands:IBrand[]=[];
 types :IType[]=[];
 brandIdSelected =0;
 typeIdSelected =0;

  constructor(private shopService : ShopService) { }

  ngOnInit(): void {
  this.getProducts();
  this.getBrands();
  this.getTypes();
  }
  getProducts(){
    this.shopService.getProducts(this.brandIdSelected,this.typeIdSelected).subscribe(response=>{if (response && response.data) {
      this.products = response.data;
    } else {
      console.log('No data found in response');
    }},
      error=>{console.log(error);});
  }
  getBrands(){
    this.shopService.getBrands().subscribe(response=>{
      this.brands=[{id:0,name:'all'},...response]
     },
      error=>{console.log(error);});
  }
  getTypes(){
    this.shopService.getTypes().subscribe(response=>{this.types=[{id:0,name:'all'},...response]},
      error=>{console.log(error);});
  }
  onBrandSelected(brandId: number){
    this.brandIdSelected=brandId;
    this.getProducts();
  }
  onTypeSelected(typeId: number){
    this.typeIdSelected=typeId;
    this.getProducts();
  }

}
