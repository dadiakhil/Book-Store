//Angular Imports
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Store related Modules/Imports
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

// store actions/reducers imports
import { FetchBooks } from '../../actions/book.actions';
import { AddToSearchListAction } from '../../actions/search.actions';
import { selectCartIds } from '../../reducers/cart.reducer';
import { selectCollectionIds } from '../../reducers/collection.reducer';
import { ReduceMappers } from '../../reducers/mapper';

// Models
import { Book } from '../.././models/book';

@Component({
  selector: 'assignment-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  // Fields used in component UI
  public booksList: Book[];
  public recentSearchs: string[];
  public errorMessage: string;
  public cartItemIds: string[] | number[];
  public collectionIds: string[] | number[];
  public bookSearch: FormGroup;

  // Observers for redux events
  private bookSubStubs = new Subscription()

  constructor( private store: Store<{ booksList: Book[],
                                      apiError: any, cartList: any,
                                      searchList: string[]
                                    }> ) {
    this.bookSearch = new FormGroup({
      bookName: new FormControl('', [ Validators.required, Validators.pattern('[a-zA-Z0-9 ]*') ])
    });
  }
  
  ngOnInit() {
    this.errorMessage = '';

    // initialising redux data change listerners(Observers)
    this.bookSubStubs.add(this.store.pipe(select(ReduceMappers.booksList)).subscribe( ( newBooksList: Book[] ) => {
      this.booksList = newBooksList;
    }));
    this.bookSubStubs.add(this.store.select(ReduceMappers.apiError).subscribe( ( errMessage ) => {
      // Show error popup to user
      if( errMessage != null ) {
        this.errorMessage = 'Error in fetching books data';
      }
    }));
    this.bookSubStubs.add(this.store.select(selectCartIds).subscribe( ( ids ) => {
      this.cartItemIds = ids;
    }));
    this.bookSubStubs.add(this.store.select(ReduceMappers.searchList).subscribe( ( searchList ) => {
      this.recentSearchs = searchList;
    }));
    this.bookSubStubs.add(this.store.select( selectCollectionIds ).subscribe( ( ids ) => {
      this.collectionIds = ids;
    }));
  }

  // function used to get the books searched by user
  getBookList() {      
    if( this.bookSearch.valid && this.bookSearch.value.bookName ){
      this.errorMessage = '';
      this.booksList = [];

      // calling search action to store all the search list
      const searchAction = new AddToSearchListAction( this.bookSearch.value.bookName );
      this.store.dispatch( searchAction );

      // calling fetch Action which linked to effects
      const fetchAction = new FetchBooks( this.bookSearch.value.bookName );
      this.store.dispatch( fetchAction );
    } else {
      this.errorMessage = "Please enter a valid search text";
    }
  }

  getStoreRef():Store<{ booksList: Book[], apiError: any, cartList: any, searchList: string[]}> {
    return this.store;
  }

  ngOnDestroy() {
    // Unsubscribing all redux subscriptions to avoid memory leaks
    this.bookSubStubs.unsubscribe()
  }
 
}