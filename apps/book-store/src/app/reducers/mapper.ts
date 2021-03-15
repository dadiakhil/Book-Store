// Angular Redux Modules
import { ActionReducerMap } from '@ngrx/store';

// Dev Definied Reducers
import { BooksListReducer } from './books.reducer';
import { APIErrorReducer } from './apiError.reducer';
import { SearchReducer } from './search.reducer';
import { cartReducer } from './cart.reducer';
import { MyCollectionReducer } from './collection.reducer';
import { AddressReducer } from './address.reducer';

export const reducerMapper: ActionReducerMap<any> = {
    booksList: BooksListReducer,
    apiError: APIErrorReducer,
    searchList: SearchReducer,
    cartList: cartReducer,
    myCollection: MyCollectionReducer,
    addressList: AddressReducer
}

// Add enums when we add new maapper in reducerMapper
export enum ReduceMappers {
    booksList = 'booksList',
    apiError = 'apiError',
    searchList = 'searchList',
    cartList = 'cartList',
    myCollection = 'myCollection',
    addressList = 'addressList'
}