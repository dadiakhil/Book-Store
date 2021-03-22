// Dev defined actions
import { SearchAction, SearchActionTypes } from '../actions/search.actions';

export interface SearchState {
    search: any,
    error: string
}
const initialState: SearchState = {
        search:'',
        error:''

}

export function SearchReducer( state = initialState, action: SearchAction):SearchState {
    switch( action.type ) {
        case SearchActionTypes.Get:
            return {
                ...state,
                search: action.error};
        case SearchActionTypes.Add:
            return {
                ...state,
                search: action.newSearch
            };
        default:
            return {
                ...state
            };
    }
}