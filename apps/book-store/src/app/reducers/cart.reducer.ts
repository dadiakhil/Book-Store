// Angular Entity related Modules
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

// Dev Defined Actions
import { CartAction, CartActionTypes } from '../actions/cart.actions';

// Models and Enums
import { Book } from '../models/book';

// Entity configuration
export const cartAdapter = createEntityAdapter<Book>();
export interface CartState extends EntityState<Book> {};

// Initial State
const initialState: CartState = cartAdapter.getInitialState();

export function cartReducer(state = initialState, action: CartAction) {
  switch (action.type) {
    case CartActionTypes.Add:
      return cartAdapter.addOne(action.bookObj, state);
    case CartActionTypes.AddMultiple:
      return cartAdapter.addMany(action.booksObj, state);
    case CartActionTypes.Update:
      return cartAdapter.updateOne(
        {
          id: action.id,
          changes: action.bookObj
        },
        state
      );
    case CartActionTypes.Remove:
      return cartAdapter.removeOne(action.id, state);
    case CartActionTypes.RemoveAll:
      return cartAdapter.removeAll(state);
    default:
      return state;
  }
}

// Creating Selector to fetch Cart details from entity
export const getCartState = createFeatureSelector<CartState>('cartList');

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = cartAdapter.getSelectors(getCartState);

// select the array of cart ids
export const selectCartIds = selectIds;

// select the dictionary of cart entities
export const selectCartEntities = selectEntities;

// select the array of cart items
export const selectAllCartItems = selectAll;

// select the total cart count
export const selectCartTotal = selectTotal;