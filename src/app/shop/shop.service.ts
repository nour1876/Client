import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/type';
import{map} from "rxjs/operators";
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';
@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl='http://localhost:5233/api/'
  constructor(private http :HttpClient) { }

  getProducts(shopParams:ShopParams){
    let params=new HttpParams();
    if(shopParams.brandId!==0){
      params=params.append('brandId',shopParams.brandId.toString())
    }
    if(shopParams.typeId!==0){
      params=params.append('typeId',shopParams.typeId.toString())
    }
    if(shopParams.search){
      params=params.append('search',shopParams.search)
    }
    if (shopParams.pageIndex) {
      params = params.append('pageIndex', shopParams.pageIndex.toString());
    } else {
      console.error('pageNumber is undefined');
    }
  
    if (shopParams.pageSize) {
      params = params.append('pageSize', shopParams.pageSize.toString());
    } else {
      console.error('pageSize is undefined');
    }
      params=params.append('sort',shopParams.sort.toString())
   

    return this.http.get<IPagination>(this.baseUrl+'products',{observe:'response',params}).pipe(
      map(response=>{
        return response.body;
      })
    );
  }
  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl+'products/brands');
  }
  getTypes(){
    return this.http.get<IType[]>(this.baseUrl+'products/types');
  }
  getProduct(id:number){
    return this.http.get<IProduct>(this.baseUrl+'products/'+id)
  }

}
