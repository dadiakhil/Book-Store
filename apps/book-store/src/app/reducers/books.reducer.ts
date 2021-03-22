
// Dev Defined Actions
import { BooksAction, BooksActionTypes } from '../actions/book.actions';
 
import { Book } from '../models/book'
 
export interface BookState {
    books: Book[],
    error: string
}
 
export const initialState: BookState = {
    books: [],
    error: ''
};
 
export function BooksListReducer( state: BookState = initialState, action: BooksAction ): BookState {
    switch ( action.type ) {
        case BooksActionTypes.Change:
            return {
                ...state,
                books: action.payload};
        case BooksActionTypes.Fetch:
            return {
                ...state,
                error: action.error
            }
        default:
            return {
                ...state
            };
    }
}