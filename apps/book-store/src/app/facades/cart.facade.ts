import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectCartIds ,selectCartEntities, selectAllCartItems, selectCartTotal } from '../reducers/cart.reducer';
import { CartState } from '../reducers/cart.reducer';
import {AddBookToCartAction,RemoveBookFromCartAction, RemoveAllBooksFromCartAction} from '../actions/cart.actions'
 
@Injectable({
  providedIn: 'root'
})
export class CartFacade {
  selectCartIds$ = this.store.pipe(select(selectCartIds));
  selectCartEntities$ = this.store.pipe(select(selectCartEntities));
  selectAllCartItems$ = this.store.pipe(select(selectAllCartItems));
  selectCartTotal$ = this.store.pipe(select(selectAllCartItems));
 
  constructor(private store: Store<CartState>) { }

  onAddToCart(bookDetails) {
    this.store.dispatch(new AddBookToCartAction(bookDetails));
  }
  onRemoveBookFromCart(selectedBookId) {
    this.store.dispatch(new RemoveBookFromCartAction(selectedBookId));
  }
  onAddingMultipleBookFromCart(selectedBookId) {
    this.store.dispatch(new RemoveBookFromCartAction(selectedBookId));
  }
  onRemovingAllBooksFromAction(){
    this.store.dispatch(new RemoveAllBooksFromCartAction());
  }

}