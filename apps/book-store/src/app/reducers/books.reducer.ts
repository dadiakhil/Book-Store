// Dev Defined Actions
import { BooksAction, BooksActionTypes } from '../actions/book.actions';

export const initialState = [];

export function BooksListReducer( state = initialState, action: BooksAction ) {
    switch ( action.type ) {
        case BooksActionTypes.Change:
            return [...action.payload];
        default:
            return [...state];
    }
}