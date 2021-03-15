// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Components used in this module
import { MyBookCollectionComponent } from './../my-book-collection/my-book-collection.component';

// Routes mapped in this module
const routes: Routes = [
  {
    path: '',
    component: MyBookCollectionComponent
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