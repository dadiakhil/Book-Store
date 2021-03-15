// Angular redux modules
import { Action } from '@ngrx/store';

// Dev Models
import { Book } from '../models/book';

export enum CartActionTypes {
    Add = '[Cart] Add',
    AddMultiple = '[Cart] AddMultiple',
    Remove = '[Cart] Remove',
    RemoveAll = '[Cart] RemoveAll',
    Update = '[Cart] Update'
}

export class CartAction implements Action {
    readonly type:string;
    bookObj?: Book;
    booksObj?: Book[];
    id?: string;
}

export class AddBookToCartAction implements CartAction {
    readonly type = CartActionTypes.Add;
    
    constructor( public bookObj: Book ) {}
}

export class AddMultipleBooksToCartAction implements CartAction {
    readonly type = CartActionTypes.AddMultiple;

    constructor( public booksObj: Book[] ) {}
}

export class RemoveBookFromCartAction implements CartAction {
    readonly type = CartActionTypes.Remove;

    constructor( public id: string ) {}
}

export class RemoveAllBooksFromCartAction implements CartAction {
    readonly type = CartActionTypes.RemoveAll;
}

export class UpdateBookInCartAction implements CartAction {
    readonly type = CartActionTypes.Update;

    constructor( public id: string, public bookObj: Book ) {}
}