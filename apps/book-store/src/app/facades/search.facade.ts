import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { searchQuery } from '../selectors/search.selectors';
import { BookState } from '../reducers/books.reducer';
import {AddToSearchListAction} from '../actions/search.actions'
 
@Injectable({
  providedIn: 'root'
})
export class SearchFacade {
  search$ = this.store.pipe(select(searchQuery.search));
  error$ = this.store.pipe(select(searchQuery.error));
 
  constructor(private store: Store<BookState>) { }

  onSearchAction(bookName) {

    this.store.dispatch(new AddToSearchListAction(bookName));
  }


}