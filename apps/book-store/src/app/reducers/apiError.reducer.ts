// Dev Defined Actions
import { ErrorAction, ErrorEnums } from '../actions/apiError.actions';

export const initialState = '';

export function APIErrorReducer( state = initialState, action: ErrorAction ) {
    switch( action.type ) {
        case ErrorEnums.APIError:
            return action.payload;
        default:
            return null;
    }
}