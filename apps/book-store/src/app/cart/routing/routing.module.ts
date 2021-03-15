import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MyCartComponent } from '../my-cart/my-cart.component'

const routes: Routes = [
  {
    path: '',
    component: MyCartComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ]
})
export class RoutingModule { }