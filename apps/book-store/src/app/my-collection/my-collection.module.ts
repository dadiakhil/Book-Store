import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyBookCollectionComponent } from './my-book-collection/my-book-collection.component';

import { MaterialModule } from '../material/material.module';
import { RoutingModule } from './routing/routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MyBookCollectionComponent],
  imports: [
    CommonModule,
    RoutingModule,
    FormsModule,
    MaterialModule

  ]
})
export class MyCollectionModule { }
