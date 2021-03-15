// Entity Related Modules
import { createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

// Dev Defined Actions
import {
  CollectionAction,
  CollectionActionTypes
} from '../actions/collection.actions';

// Dev Models
import { Book } from '../models/book';

// Entity adapter
export const collectionAdapter = createEntityAdapter<Book>();
export interface CollectionState extends EntityState<Book> {}

export const initialState: CollectionState = collectionAdapter.getInitialState();

export function MyCollectionReducer(
  state = initialState,
  action: CollectionAction
) {
  switch (action.type) {
    case CollectionActionTypes.Add:
      return collectionAdapter.addOne(action.newBook, state);
    case CollectionActionTypes.AddMultiple:
      return collectionAdapter.addMany(action.multipleBooks, state);
    case CollectionActionTypes.Update:
      return collectionAdapter.updateOne(
        {
          id: action.id,
          changes: action.newBook
        },
        state
      );
    case CollectionActionTypes.Remove:
      return collectionAdapter.removeOne(action.id, state);
    default:
      return state;
  }
}

export const getCollectionState = createFeatureSelector<CollectionState>(
  'myCollection'
);

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = collectionAdapter.getSelectors(getCollectionState);

// select the array of cart ids
export const selectCollectionIds = selectIds;

// select the dictionary of cart entities
export const selectCollectionEntities = selectEntities;

// select the array of cart items
export const selectAllCollectionItems = selectAll;

// select the total cart count
export const selectCollectionTotal = selectTotal;