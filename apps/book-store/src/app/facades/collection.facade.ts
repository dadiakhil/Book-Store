import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectCollectionIds ,selectCollectionEntities, selectAllCollectionItems, selectCollectionTotal } from '../reducers/collection.reducer';
import { CartState } from '../reducers/cart.reducer';
import {AddMultipleToCollectionAction} from '../actions/collection.actions'
 
@Injectable({
  providedIn: 'root'
})
export class CollectionFacade {
  selectCollectionIds$ = this.store.pipe(select(selectCollectionIds));
  selectCollectionEntities$ = this.store.pipe(select(selectCollectionEntities));
  selectAllCollectionItems$ = this.store.pipe(select(selectAllCollectionItems));
  selectCollectionTotal$ = this.store.pipe(select(selectCollectionTotal));
 
  constructor(private store: Store<CartState>) { }

  onAddingMultipleAction(cartDetails) {
    this.store.dispatch(new AddMultipleToCollectionAction(cartDetails));
  }


}