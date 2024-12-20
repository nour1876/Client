import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PagingHeaderComponent } from '../shared/Components/paging-header/paging-header.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { ShopRoutingModule } from './shop-routing.module';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SectionHeaderComponent } from '../core/section-header/section-header.component';


@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    PagingHeaderComponent,
    ProductDetailsComponent,
   
    
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule,
    ShopRoutingModule,
    BreadcrumbModule,
  ]
})
export class ShopModule { }
