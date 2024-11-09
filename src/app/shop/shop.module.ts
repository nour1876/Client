import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PagingHeaderComponent } from '../shared/Components/paging-header/paging-header.component';


@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    PagingHeaderComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule
  ],
  exports:[ShopComponent]
})
export class ShopModule { }
