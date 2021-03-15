// Redux store
import { Action } from '@ngrx/store';

// Dev Models
import { Address } from '../models/address';

export enum AddressActionTypes {
    Add = '[Address] Add',
    Update = '[Address] Update'
} 

export class AddressAction implements Action {
    readonly type:string;
    address: Address;
}

export class AddAddressAction implements AddressAction {
    readonly type = AddressActionTypes.Add;

    constructor( public address: Address ) {}
}

export class UpdateAddressAction implements AddressAction {
    readonly type = AddressActionTypes.Update;

    constructor( public address: Address ) {}
}