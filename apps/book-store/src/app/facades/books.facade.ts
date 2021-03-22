import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { bookQuery } from '../selectors/books.selectors';
import { BookState } from '../reducers/books.reducer';
import { FetchBooks } from '../actions/book.actions';
 
@Injectable({
  providedIn: 'root'
})
export class BookFacade {
  book$ = this.store.pipe(select(bookQuery.book));
  error$ = this.store.pipe(select(bookQuery.error));
 
  constructor(private store: Store<BookState>) { }

  onFetchAction(bookName) {
    this.store.dispatch(new FetchBooks(bookName));
  }
}