// Dev defined actions
import { SearchAction, SearchActionTypes } from '../actions/search.actions';

const initialState = [];

export function SearchReducer( state = initialState, action: SearchAction):string[] {
    switch( action.type ) {
        case SearchActionTypes.Get:
            return [...state];
        case SearchActionTypes.Add:
            return [...state, action.newSearch];
        default:
            return [...state];
    }
}