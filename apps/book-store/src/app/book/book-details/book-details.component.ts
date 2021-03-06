// Angular Modules
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../.././material/material.module';
// Redux Modules
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {CollectionFacade} from '../../facades/collection.facade';

//Models
import { Book } from '../../models/book';
import { ReduceMappers } from '../../reducers/mapper';

// environment details
import { environment } from '../../../environments/environment';

import {BookFacade} from '../../facades/books.facade';
import { CartFacade } from '../../facades/cart.facade';

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
  private bookSubStubs = new Subscription();

  // activate route to fetch params from URL, router to redirect to other URLs
  constructor( private store: Store<{ booksList: Book[], cartList: any  }>,
               private route: ActivatedRoute,
               private router: Router,
               private bookFacade:BookFacade,
               private cartFacade:CartFacade,
               private collectionFacade:CollectionFacade) { }

  ngOnInit() {
    // Local fields initialization
    this.bookSubStubs.add(this.bookFacade.book$.subscribe( ( booksList ) => {
      this.books = booksList;
    }));
    
    this.bookSubStubs.add(this.store.select(ReduceMappers.cartList).subscribe( ( cartList ) => {
      this.cartList = cartList;    
    }));
    this.bookSubStubs.add(this.collectionFacade.selectCollectionIds$.subscribe( ( ids ) => {
      this.collectionIds = ids;
    }));
    
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
    this.cartFacade.onAddToCart(this.bookDetails);
    this.checkItemExistsInCart();
  }

  // Adding book to cart and redirecting user to cart
  buyNow(){
    this.addBookToCart();
    this.router.navigate(['/cart']);
  }

  // removing item from cart
  removeBookFromCart(){
    this.cartFacade.onRemoveBookFromCart(this.selectedBookId)
    this.checkItemExistsInCart();
  }

  setSelectedBookId( newId: string ) {
    this.selectedBookId = newId;
  }

  ngOnDestroy() {
    // Unsubscribing redux subscribers to avoid memory leaks
    this.bookSubStubs.unsubscribe()
  }

  getStoreRef(): Store<{ booksList: Book[], cartList: any  }>{
    return this.store;
  }

  setCartList( cartDetails ) {
    this.cartList = cartDetails;
  }
}
