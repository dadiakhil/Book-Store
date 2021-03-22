//Angular Modules
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// store related modules/imports
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import {RemoveAllBooksFromCartAction } from '../../actions/cart.actions';
import { UpdateAddressAction } from '../../actions/address.actions';
import {CartFacade} from '../../facades/cart.facade';
import {CollectionFacade} from '../../facades/collection.facade'
// Dev Models and Enums
import { Book } from '../../models/book';
import { ReduceMappers } from '../../reducers/mapper';
import { Address } from '../../models/address';
import { MaterialModule } from '../.././material/material.module';
@Component({
  selector: 'assignment-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit, OnDestroy {
  // Variables used in HTML
  public cartDetails: Book[];
  public expandAddressBlock: boolean;
  public name: string;
  public mobileNo: number;
  public address: string;
  public cartValue: number;

  // Varibles used in component only
  private clearCartDetails: boolean;
  private existingAddress: Address;

  // Subscriptions to fetch data from store
  private bookCartSubStubs = new Subscription();

  constructor( private store: Store<{CartState, CollectionState, addressList: Address[]}>,
                private _snackBar: MatSnackBar, private cartFacade:CartFacade,
                private collectionFacade:CollectionFacade) { }

  ngOnInit() {
    // Initialising varibles
    this.clearCartDetails = false;

    this.bookCartSubStubs.add(this.cartFacade.selectAllCartItems$.subscribe( ( cartData ) => {
      this.cartDetails = cartData;

      this.calculateCartValue();
    }));
    this.bookCartSubStubs.add(this.collectionFacade.selectAllCollectionItems$.subscribe( () => {
      if( this.clearCartDetails === true ) {
       this.cartFacade.onRemovingAllBooksFromAction();
        this.clearCartDetails = false;
      }
    }));
    this.bookCartSubStubs.add(this.store.select(ReduceMappers.addressList).subscribe( ( addressDetails ) => {
      if( addressDetails && addressDetails.length ) {
        this.existingAddress = addressDetails[0];

        if( this.existingAddress && this.existingAddress.name ) {
          this.name = this.existingAddress.name;
          this.address = this.existingAddress.address;
          this.mobileNo = this.existingAddress.mobileNo;
        }
      }
    }));

    this.expandAddressBlock = false;
  }

  // calculating sum of cart items price
  calculateCartValue() {
    this.cartValue = this.cartDetails.reduce( ( totalValue, cartObj ) => {
      return totalValue + cartObj.price;
    }, 0);
  }

  // Removes book from cart
  removeBookFromCart( bookId: string ) {
    this.cartFacade.onRemoveBookFromCart(bookId);
  }

  // Payment process - requesting address details, clearing cart and adding to collection
  payNow() {
    if( !this.name || this.name.length === 0 ) {
      this.expandAddressBlock = true;
    }else{
      this.expandAddressBlock = false;
      
      this._snackBar.open('Payment', 'Success', {
        duration: 3000,
      });
      this.clearCartDetails = true;
      if( !this.existingAddress ) {
        this.existingAddress = {
                                  name: '',
                                  id: null,
                                  address: '',
                                  mobileNo: null
                                };
      }
      this.existingAddress.id = this.existingAddress.id ? this.existingAddress.id : new Date().getTime();
      this.existingAddress.name = this.name;
      this.existingAddress.mobileNo = this.mobileNo;
      this.existingAddress.address = this.address;
      this.cartDetails = this.cartDetails.map( ( bookItem ) => {
        return bookItem;
      });
      this.collectionFacade.onAddingMultipleAction(this.cartDetails);
      const updateAddressAction = new UpdateAddressAction( this.existingAddress );
      this.store.dispatch( updateAddressAction );
    }
  }

  getStoreObj():Store<{CartState, CollectionState, addressList: Address[]}> {
    return this.store;
  }

  ngOnDestroy() {
    // UnSubscribing all redux subscribers to avoid memory leaks
    this.bookCartSubStubs.unsubscribe();
  }

}