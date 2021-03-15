import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from '../../routing/routing.module';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';

import { By } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from '../../effects/books.effects';
import { reducerMapper } from '../../reducers/mapper';
import { ChangeBooks } from '../../actions/book.actions';
import {BookSearchComponent} from '../book-search/book-search.component';
import { getSampleBook } from '../book-search/book-search.component.spec';

import { MaterialModule } from '../../material/material.module';
describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RoutingModule,
        MaterialModule,
        StoreModule.forRoot(reducerMapper),
        EffectsModule.forRoot([BooksEffects])
      ],
      declarations: [BookDetailsComponent, BookSearchComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/'},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({bookId: getSampleBook().id})
            }
          }
    }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not contain bookDetail block initially', ()=>{
    expect( fixture.debugElement.query( By.css('.example-card') ) ).toBeFalsy();
  });

  it('should show book details', ()=>{
    component.bookDetails = getSampleBook();

    component.setSelectedBookId( component.bookDetails.id );

    fixture.detectChanges();

    expect( fixture.debugElement.query( By.css('.example-card') ).nativeElement ).toBeTruthy();
  });

  it('should not show "add to cart / buy now" if already added book to cart', () => {
    component.bookDetails = getSampleBook();

    component.setSelectedBookId( component.bookDetails.id );
    component.setCartList( { ids: [ component.bookDetails.id ] } );
    component.checkItemExistsInCart();

    expect( component.itemBought ).toBeTruthy();
  });

  it('should show "add to cart / buy now" if selected book not in cart', () => {
    component.bookDetails = getSampleBook();

    component.setSelectedBookId( 'randomId' );
    component.checkItemExistsInCart();

    expect( component.itemBought ).toBeFalsy();
  });

  it('should show "add to cart / buy now" if book removed from cart', () => {
    component.bookDetails = getSampleBook();

    component.setSelectedBookId( component.bookDetails.id );

    component.removeBookFromCart();

    expect( component.itemBought ).toBeFalsy();
  });

  it('should show "remove" if user clicked on buy now button', () => {
    component.bookDetails = getSampleBook();
    const router: Router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    component.setSelectedBookId( component.bookDetails.id );
    component.setCartList( { ids: [ component.bookDetails.id ] } );
    component.buyNow();
    
    expect( component.itemBought ).toBeTruthy();
    expect( navigateSpy ).toHaveBeenCalledWith( ['/cart'] );
  });

  it('should redirect to home if book details is null', () => {
    component.bookDetails = null;

    const router: Router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect( navigateSpy ).toHaveBeenCalledWith(['/']);
  });

  it('should get book details from book list', () => {
    const sampleBook = getSampleBook();
    const booksAction = new ChangeBooks( [ sampleBook ] );
    component.getStoreRef().dispatch( booksAction );
    component.setSelectedBookId( sampleBook.id );
    component.ngOnInit();

    expect( component.bookDetails.id ).toBe( sampleBook.id );
  });
});
