import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { IProduct } from './models/product';
import { IPagination } from './models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  title = 'Client';
  products: IProduct[]=[];
  constructor(private http : HttpClient){
  
  }
  ngOnInit(): void {
    this.http.get<IPagination>('https://localhost:7191/api/Products?pageSize=50').subscribe((response:IPagination)=>{
      this.products=response.data;
    },error=>{
      console.log(error);
    });
  }
}
