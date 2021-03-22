import { createFeatureSelector, createSelector } from '@ngrx/store';
 
import { BookState } from '../reducers/books.reducer';
import { ReduceMappers } from '../reducers/mapper';


const BOOK_KEY = ReduceMappers.booksList
 
const bookFeature = createFeatureSelector<BookState>(BOOK_KEY);
 
const book = createSelector(bookFeature, (state: BookState) => state.books);
const error = createSelector(bookFeature, (state: BookState) => state.error);
 
export const bookQuery = {
  book,
  error
};