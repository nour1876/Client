import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/type';
import{map} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl='http://localhost:5233/api/'
  constructor(private http :HttpClient) { }

  getProducts(brandId?:number,typeId?:number,sort?:string){
    let params=new HttpParams();
    if(brandId){
      params=params.append('brandId',brandId.toString())
    }
    if(typeId){
      params=params.append('typeId',typeId.toString())
    }
    if(sort){
      params=params.append('sort',sort.toString())
    }

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

}
