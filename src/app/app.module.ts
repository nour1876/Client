import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { CoreModule } from './core/core.module';
import { ShopComponent } from './shop/shop.component';
import { ShopModule } from './shop/shop.module';
import { HomeModule } from './home/home.module';
import { ErrorInterceptor } from './core/Interceptors/error.interceptor';
import { BreadcrumbComponent, BreadcrumbModule } from 'xng-breadcrumb';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { BasketComponent } from './basket/basket.component';
import { BasketModule } from './basket/basket.module';
import { AccountModule } from './account/account.module';
import { CheckoutModule } from './checkout/checkout.module';
@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    
       
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    HomeModule,
    ShopModule,
    BreadcrumbModule,
    BasketModule,
    AccountModule,
    CheckoutModule
   
    

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
