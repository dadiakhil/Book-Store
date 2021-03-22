import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Book } from '../../models/book';
import {CollectionFacade} from '../../facades/collection.facade'

@Component({
  selector: 'assignment-my-book-collection',
  templateUrl: './my-book-collection.component.html',
  styleUrls: ['./my-book-collection.component.css']
})
export class MyBookCollectionComponent implements OnInit, OnDestroy {
  public collectionBooks: Book[];
  private collectionSub: Subscription;
  constructor(private store: Store<{CollectionState}>,
                private collectionFacade:CollectionFacade) { }

  ngOnInit() {
    // Fetching collection details from store
    this.collectionSub = this.collectionFacade.selectAllCollectionItems$.subscribe( ( collectionData ) => {
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
