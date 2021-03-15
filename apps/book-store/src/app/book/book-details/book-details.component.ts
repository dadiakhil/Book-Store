// Angular Modules
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../.././material/material.module';
// Redux Modules
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AddBookToCartAction, RemoveBookFromCartAction } from '../../actions/cart.actions';
import { selectCollectionIds } from '../../reducers/collection.reducer';

//Models
import { Book } from '../../models/book';
import { ReduceMappers } from '../../reducers/mapper';

// environment details
import { environment } from '../../../environments/environment';

@Component({
  selector: 'assignment-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  // Private varibles to implement functionality
  private books: Book[];
  private selectedBookId: string;
  private cartList: any;

  // Varibles used in HTML
  public bookDetails: Book;
  public itemBought: boolean;
  public collectionIds: string[] | number[];

  // redux Observables
  private booksListSub: Subscription;
  private cartObjSub: Subscription;
  private collectionSub: Subscription;

  // activate route to fetch params from URL, router to redirect to other URLs
  constructor( private store: Store<{ booksList: Book[], cartList: any  }>,
               private route: ActivatedRoute,
               private router: Router ) { }

  ngOnInit() {
    // Local fields initialization
    this.booksListSub = this.store.select(ReduceMappers.booksList).subscribe( ( booksList ) => {
      this.books = booksList;
    });;
    this.cartObjSub = this.store.select(ReduceMappers.cartList).subscribe( ( cartList ) => {
      this.cartList = cartList;    
    });
    this.collectionSub = this.store.select( selectCollectionIds ).subscribe( ( ids ) => {
      this.collectionIds = ids;
    });
    
    this.itemBought = false;

    // Fetching Id from URL
    this.selectedBookId = this.route.snapshot.paramMap.get( environment.urlParams["bookdetails#"] );
    
    // Fetching selected book details
    if( this.selectedBookId ) {
      this.books.forEach( ( bookData ) => {
        if( bookData.id === this.selectedBookId ){
          this.bookDetails = bookData;
        }
      });
    }
    
    // redirecting to home if bookslist missing in store
    if( !this.bookDetails ){
      this.router.navigate(['/']);
    }

    this.checkItemExistsInCart();
  }

  // Checking if book already exists in cart or not
  checkItemExistsInCart(){
    if( this.selectedBookId && this.cartList ) {
      this.itemBought = this.cartList.ids.some( ( id ) => {
        return id === this.selectedBookId;
      }); 
    } else {
      this.itemBought = false;
    }
  }

  // Adding item to cart
  addBookToCart(){
    const cartAction = new AddBookToCartAction( this.bookDetails );

    this.store.dispatch( cartAction );

    this.checkItemExistsInCart();
  }

  // Adding book to cart and redirecting user to cart
  buyNow(){
    this.addBookToCart();

    this.router.navigate(['/cart']);
  }

  // removing item from cart
  removeBookFromCart(){
    const cartAction = new RemoveBookFromCartAction( this.selectedBookId );

    this.store.dispatch( cartAction );

    this.checkItemExistsInCart();
  }

  setSelectedBookId( newId: string ) {
    this.selectedBookId = newId;
  }

  ngOnDestroy() {
    // Unsubscribing redux subscribers to avoid memory leaks
    if( this.booksListSub ) {
      this.booksListSub.unsubscribe();
      this.cartObjSub.unsubscribe();
      this.collectionSub.unsubscribe();
    }
  }

  getStoreRef(): Store<{ booksList: Book[], cartList: any  }>{
    return this.store;
  }

  setCartList( cartDetails ) {
    this.cartList = cartDetails;
  }
}
