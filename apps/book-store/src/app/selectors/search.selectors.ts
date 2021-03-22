import { createFeatureSelector, createSelector } from '@ngrx/store';
 
import { SearchState } from '../reducers/search.reducer';
import { ReduceMappers } from '../reducers/mapper';


const SEARCH_KEY = ReduceMappers.searchList
 
const searchFeature = createFeatureSelector<SearchState>(SEARCH_KEY);
 
const search = createSelector(searchFeature, (state: SearchState) => state.search);
const error = createSelector(searchFeature, (state: SearchState) => state.error);
 
export const searchQuery = {
    search,
  error
};