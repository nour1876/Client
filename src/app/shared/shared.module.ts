import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagingHeaderComponent } from './Components/paging-header/paging-header.component';
import { OrderTotalsComponent } from './Components/order-totals/order-totals.component';





@NgModule({
  declarations: [
  
    OrderTotalsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports:[ OrderTotalsComponent]
})
export class SharedModule { }
