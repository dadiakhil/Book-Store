//Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';


//Angular routing modules
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing/routing.module';

//Angular Form modules
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

//Angular component imports
import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SideNavListComponent } from './side-nav/side-nav-list/side-nav-list.component';
import { BookSearchComponent } from './book/book-search/book-search.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';

//store realted modules/imports
import { reducerMapper } from './reducers/mapper';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from './effects/books.effects';

//Angular material import 
import { MaterialModule } from './material/material.module';

//evironment
import { environment } from './../environments/environment.prod';


@NgModule({
  declarations: [AppComponent, SideNavComponent, SideNavListComponent, BookDetailsComponent, BookSearchComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    NoopAnimationsModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot(reducerMapper),
            EffectsModule.forRoot([BooksEffects]),
            environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
