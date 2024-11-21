import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { BasketComponent } from './basket/basket.component';

const routes: Routes = [
  {path:'',component:HomeComponent,data:{breadcrumb:'Home'}},
  {path:'test-error',component:TestErrorComponent,data:{breadcrumb:'Test Errors'}},
  {path:'server-error',component:ServerErrorComponent,data:{breadcrumb:'Server Error'}},
  {path:'not-found',component:NotFoundComponent, data:{breadcrumb:'Not Found'}},
  { 
    path: 'shop/:id',
    component: ProductDetailsComponent , data:{breadcrumb:{alias:'productDetails'}}},
  //{path:'shop', loadChildren:()=>import('./shop/shop.module').then(mod=>mod.ShopModule) , data:{breadcrumb:'Shop'}}, // lazy Loading
    // Main shop route
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
    {path: 'basket',
      component: BasketComponent,
      data: { breadcrumb: 'Basket' }},
  //{path:'basket', loadChildren:()=>import('./basket/basket.module').then(mod=>mod.BasketModule) , data:{breadcrumb:'Basket'}}, // lazy Loading
  {path:'**',redirectTo:'not-found',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
