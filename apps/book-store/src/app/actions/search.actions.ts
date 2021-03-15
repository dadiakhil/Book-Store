// Angular Redux Store Module
import { Action } from '@ngrx/store';

export enum SearchActionTypes {
    Add = '[Search Component] Add',
    Get = '[Search Component] Get'
}

export class SearchAction implements Action {
    readonly type:string;
    newSearch?: any;
}

export class AddToSearchListAction implements SearchAction {
    readonly type = SearchActionTypes.Add;

    constructor( public newSearch: string ) {}
}

export class GetSearchListAction implements SearchAction {
    readonly type = SearchActionTypes.Get;
}