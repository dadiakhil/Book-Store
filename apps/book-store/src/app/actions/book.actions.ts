// NGRX Modules
import { Action } from '@ngrx/store';

// Developed Models
import { Book } from '../models/book';

export enum BooksActionTypes {
    Change = '[Books Component] Change',
    Fetch = '[Books Component] Fetch',
    FetchError = '[Books Component] FetchError'
}

export class BooksAction implements Action {
    readonly type: string;
    payload: any;
}

export class ChangeBooks implements BooksAction {
    readonly type = BooksActionTypes.Change;
    
    constructor( public payload: Book[] ) {}
}

export class FetchBooks implements BooksAction {
    readonly type = BooksActionTypes.Fetch;

    constructor( public payload: string ) {}
}