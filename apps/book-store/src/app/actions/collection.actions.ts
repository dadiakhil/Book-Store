// Angular Redux models
import { Action } from '@ngrx/store';

// Dev Models
import { Book } from '../models/book';

export enum CollectionActionTypes {
    Add = '[Collection] Add',
    AddMultiple = '[Collection] AddMultiple',
    Remove = '[Collection] Remove',
    Update = '[Collection] Update'
}

export class CollectionAction implements Action {
    readonly type:string;
    newBook?: Book;
    multipleBooks?: Book[];
    id?: string ;
}

export class AddToCollectionAction implements CollectionAction {
    readonly type = CollectionActionTypes.Add;

    constructor( public newBook: Book ) {}
}

export class AddMultipleToCollectionAction implements CollectionAction {
    readonly type = CollectionActionTypes.AddMultiple;

    constructor( public multipleBooks: Book[] ) {}
}

export class UpdateCollectionAction implements CollectionAction {
    readonly type = CollectionActionTypes.Update;

    constructor( public id: string, public newBookDetails: Book ) {}
}

export class RemoveFromCollectionAction implements CollectionAction {
    readonly type = CollectionActionTypes.Remove;

    constructor( id: string ) {}
}