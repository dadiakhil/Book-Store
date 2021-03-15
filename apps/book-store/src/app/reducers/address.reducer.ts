// Dev Defined actions
import { AddressAction, AddressActionTypes } from '../actions/address.actions';
import {Address} from '../models/address'

const initialState = [];

export function AddressReducer( state = initialState, action: AddressAction ):Address[] {
    switch( action.type ) {
        case AddressActionTypes.Add:
            return [...state, action.address ];
        case AddressActionTypes.Update:
            let addressFound = false;

            state.forEach( ( addressObj ) => {
                if( addressObj.id === action.address.id ) {
                    addressObj = action.address;
                    addressFound = true;
                }
            });

            if( addressFound )
                return [...state];
            else
                return [action.address, ...state]
        default:
            return [...state];
    }
}