import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { error } from 'console';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
 baseUrl = environment.apiUrl
 private basketSource = new BehaviorSubject<IBasket>({id:'',items:[]});
 basket$=this.basketSource.asObservable();
 private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
 basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http : HttpClient) { }
  getBasket(id: string) {
    return this.http.get<IBasket>(`${this.baseUrl}basket?id=${id}`).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket); 
        console.log(this.getCurrentBasketValue());// Update the BehaviorSubject with the basket
        this.calculateTotals();
      })

    );
  }

  setBasket(basket:IBasket){
    return this.http.post<IBasket>(this.baseUrl+'basket',basket).subscribe((response:IBasket)=>{
      this.basketSource.next(response);
      this.calculateTotals();
      console.log(response);
    },error=>{
      console.log(error);
    })
  }
  
  getCurrentBasketValue(){
    return this.basketSource.value;
  }
  addItemToBasket(item:IProduct,quantity=1){
  const itemToAdd:IBasketItem=this.mapProductItemToBasketItem(item,quantity);
  let basket  = this.getCurrentBasketValue();
  if(basket.id==''){
    basket = this.createBasket() ;
  }
  
  basket.items=this.addUpdateItem(basket.items,itemToAdd,quantity);
  console.log(basket);
  
  }
   calculateTotals(){
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subtotal = basket.items.reduce((a,b)=>(b.productPrice*b.quantity)+a,0);
    console.log(basket);
    console.log(subtotal);
    const total = subtotal+shipping;
    console.log(this.basketTotalSource)
     this.basketTotalSource.next({shipping,total,subtotal});
     return this.basketTotalSource
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


