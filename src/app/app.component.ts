import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { IProduct } from './shared/models/product';
import { IPagination } from './shared/models/pagination';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
 
  title = 'Client';
  constructor(private basketService: BasketService,private accountService : AccountService){
 
  }
  ngOnInit(): void {
  this.loadBasket();
  this.loadCurrentUser();
  }
  loadCurrentUser(){
    const token = localStorage.getItem('token');
    if(token){
      this.accountService.loadCurrentUser(token).subscribe(()=>{
        console.log('loaded user');
      },error=>{
        console.log(error);
      })
    }
  }
  loadBasket(){
    const basketId=localStorage.getItem('basket_id');
    if(basketId){
      this.basketService.getBasket(basketId).subscribe(()=>{
        console.log('initialized basket')
      },error=>{
        console.log(error)
      })
    }
  }
  
  
}
