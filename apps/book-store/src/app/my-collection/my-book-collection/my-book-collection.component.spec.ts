import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {MaterialModule } from '../../material/material.module';
import { RoutingModule } from '../routing/routing.module';
import { MyBookCollectionComponent } from './my-book-collection.component';
import { StoreModule } from '@ngrx/store';
import { reducerMapper } from '../../reducers/mapper';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from '../../effects/books.effects';
import { getSampleCartObj } from '../../cart/my-cart/my-cart.component.spec';
import { AddToCollectionAction } from '../../actions/collection.actions';

describe('MyBookCollectionComponent', () => {
  let component: MyBookCollectionComponent;
  let fixture: ComponentFixture<MyBookCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RoutingModule,
        FormsModule,
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        StoreModule.forRoot(reducerMapper),
        EffectsModule.forRoot([BooksEffects])
      ],
      declarations: [ MyBookCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBookCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should show 'No Books Added to Collection!' initially`, () => {
    component.collectionBooks = [];

    fixture.detectChanges();

    expect( fixture.debugElement.query( By.css('.noCollectionItems') ) ).toBeTruthy();
  });

  it(`should show collection Block`, () => {
    const collectionAction = new AddToCollectionAction( getSampleCartObj()[0] );
    component.getStoreRef().dispatch( collectionAction );

    fixture.detectChanges();

    expect( fixture.debugElement.query( By.css('.collectionItemsBlock') ) ).toBeTruthy();
  });
});
