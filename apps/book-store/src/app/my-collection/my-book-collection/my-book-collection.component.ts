import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAllCollectionItems } from '../../reducers/collection.reducer';
import { Book } from '../../models/book';

@Component({
  selector: 'assignment-my-book-collection',
  templateUrl: './my-book-collection.component.html',
  styleUrls: ['./my-book-collection.component.css']
})
export class MyBookCollectionComponent implements OnInit, OnDestroy {
  public collectionBooks: Book[];
  private collectionSub: Subscription;
  constructor(private store: Store<{CollectionState}>) { }

  ngOnInit() {
    // Fetching collection details from store
    this.collectionSub = this.store.select( selectAllCollectionItems ).subscribe( ( collectionData ) => {
      this.collectionBooks = collectionData;      
    });
  }

  getStoreRef():Store<{CollectionState}> {
    return this.store;
  }

  ngOnDestroy() {
    // UnSubscribing to avoid memory leaks
    if( this.collectionSub ){
      this.collectionSub.unsubscribe();
    }
  }

}
