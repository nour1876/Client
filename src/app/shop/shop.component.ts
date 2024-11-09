import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/models/product';
import { error } from 'console';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false })
  searchTerm!: ElementRef;
 products:IProduct[]=[];
 brands:IBrand[]=[];
 types :IType[]=[];
 shopParams  = new ShopParams();
 totalCount=0;
 p=0;
 sortOptions=[
  {name:'Alphabetical',value:'name'},
  {name:'Price : Low to High',value:'priceAsc'},
  {name:'Price : High to Low',value:'priceDesc'}

 ]

  constructor(private shopService : ShopService) { }

  ngOnInit(): void {
  this.getProducts();
  this.getBrands();
  this.getTypes();
  }
  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe(response=>{if (response && response.data) {
      this.products = response.data;
      this.shopParams.pageNumber=response.pageIndex;
      this.shopParams.pageSize=response.pageSize;
      this.totalCount=response.count;
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
    this.shopParams.brandId=brandId;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }
  onTypeSelected(typeId: number){
    this.shopParams.typeId=typeId;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }

  onSortSelected(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Type assertion
    this.shopParams.sort = selectElement.value; // Access the value safely
    this.getProducts();
  }
  onPageChanged(event:any){
    if(this.shopParams.pageNumber != event){
      this.shopParams.pageNumber=event.page;
      this.getProducts();
    }
   
  }
  onSearch(){
    this.shopParams.search=this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }
  onReset(){
    this.searchTerm.nativeElement.value=undefined;
    this.shopParams=new ShopParams();
    this.getProducts();
  }
}
