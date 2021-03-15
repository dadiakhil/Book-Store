import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCartComponent } from './my-cart/my-cart.component';
import { MaterialModule } from '../material/material.module';
import { RoutingModule } from './routing/routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [MyCartComponent],
  imports: [
    CommonModule,
    RoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class CartModule { }
