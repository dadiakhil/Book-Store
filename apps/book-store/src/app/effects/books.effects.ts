// Angular Modules
import { Injectable } from '@angular/core';

// RXJS/NGRX Modules
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, filter } from 'rxjs/operators';
import { of } from 'rxjs';

// Dev Defined Services/Actions
import { BookApiService } from '../services/book-api.service';
import { BooksActionTypes, FetchBooks } from '../actions/book.actions';
import { APIErrorAction } from '../actions/apiError.actions';

// Dev Models
import { Book } from '../models/book';

@Injectable()
export class BooksEffects {
    // Creating an effect mapping to BooksActionTypes.Fetch
    fetchBooks = createEffect( () =>
        this.actions.pipe(
            ofType(BooksActionTypes.Fetch),
            switchMap( ( action: FetchBooks ) =>
                this.booksService.searchBooks(action.payload).pipe(
                    // Mapping google response to local Book Model
                    map( ( res: any ) => {                                                
                        if( res && res.items ) {
                            return res.items.map( ( obj: any ) => {
                                return {
                                            id: obj.id,
                                            authors: obj.volumeInfo.authors,
                                            currency: (obj.saleInfo.retailPrice && obj.saleInfo.retailPrice.currencyCode ) ? obj.saleInfo.retailPrice.currencyCode : '',
                                            price: (obj.saleInfo.retailPrice && obj.saleInfo.retailPrice.amount ) ? obj.saleInfo.retailPrice.amount : 0,
                                            imageLink: obj.volumeInfo.imageLinks && obj.volumeInfo.imageLinks.thumbnail ? obj.volumeInfo.imageLinks.thumbnail : '',
                                            publisher: obj.volumeInfo.publisher,
                                            title: obj.volumeInfo.title,
                                            description: obj.volumeInfo.description
                                        };
                            });
                        } else {
                            throw new Error( res );
                        }
                    }),
                    // Removing all invalid books from the response
                    filter( ( res: Book ) => {
                        return (res.imageLink !== '' && res.price !== 0 );
                    }),
                    // Calling Books Action
                    map( response => ( {type: BooksActionTypes.Change, payload: response })),
                    // Calling API response Action
                    catchError( ( errRes ) => {
                        const fetchError = new APIErrorAction( errRes );
                        return of(fetchError);
                    })
                )
            )
        )
    );

    constructor( private actions: Actions, private booksService: BookApiService) {}
}