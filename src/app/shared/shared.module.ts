import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagingHeaderComponent } from './Components/paging-header/paging-header.component';
import { OrderTotalsComponent } from './Components/order-totals/order-totals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
  
    OrderTotalsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[ OrderTotalsComponent,ReactiveFormsModule]
})
export class SharedModule { }
