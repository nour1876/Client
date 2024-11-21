import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem } from '../shared/models/basket';
import { error } from 'console';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
 baseUrl = environment.apiUrl
 private basketSource = new BehaviorSubject<IBasket>({id:'',items:[]});
 basket$=this.basketSource.asObservable();
  constructor(private http : HttpClient) { }
  getBasket(id: string) {
    return this.http.get<IBasket>(`${this.baseUrl}basket?id=${id}`).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket); // Update the BehaviorSubject with the basket
      })

    );
  }

  setBasket(basket:IBasket){
    return this.http.post<IBasket>(this.baseUrl+'basket',basket).subscribe((response:IBasket)=>{
      this.basketSource.next(response);
      console.log(response);
    },error=>{
      console.log(error);
    })
  }
  
  getCurrentBasketValue(){
    return this.basketSource.value;
  }
  addItemToBasket(item:IProduct,quantity=1){
    console.log('entered to basket service' )
  const itemToAdd:IBasketItem=this.mapProductItemToBasketItem(item,quantity);
  console.log(itemToAdd);
  var test = this.getCurrentBasketValue();
  const basket = test.id === '' ? this.createBasket() : this.getCurrentBasketValue();
  console.log(basket)
  if(basket){
    basket.items=this.addUpdateItem(basket.items,itemToAdd,quantity);
  }
  
  }
  addUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
   

      const index = items.findIndex(i=>i.id===itemToAdd.id);
      if(index===-1){
        itemToAdd.quantity=quantity;
        items.push(itemToAdd);

      }else{
        items[index].quantity +=quantity;
      }
      return items;
    
  }
  createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id',basket.id);
    return basket;

  }
  mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id:item.id,
      productName:item.name,
      productPrice:item.price,
      pictureUrl:item.pictureUrl,
      quantity,
      brand:item.productBrand,
      type:item.productType
    };
  }
}


