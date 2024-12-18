import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { ChekcoutRoutingModule } from './chekcout-routing.module';



@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    ChekcoutRoutingModule
  ]
})
export class CheckoutModule { }
