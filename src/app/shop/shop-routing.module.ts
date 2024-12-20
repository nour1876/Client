import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes =  [
  {
    path: '',
    component: ShopComponent,
    data: { breadcrumb: 'Shop' }
  },
  {
    path: ':id',
    component: ProductDetailsComponent,
    data: { breadcrumb: { alias: 'productDetails' } ,
  breadcrumb2:{alias:'shop'}} // Alias for breadcrumb
  },
     {
      path: 'shop',
      component: ShopComponent,
      data: { breadcrumb: 'Shop' },
      children: [
        // Product details as a child of shop
        {
          path: ':id',
          component: ProductDetailsComponent,
          data: { breadcrumb: {alias:'productDetails' },
        },
        }
      ]
    },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class ShopRoutingModule { }
