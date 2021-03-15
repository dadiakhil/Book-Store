import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSearchComponent } from './book-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from '../../routing/routing.module';

import { By } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { DebugElement } from '@angular/core';

import { MaterialModule } from '../../material/material.module';
import { ChangeBooks } from '../../actions/book.actions';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from '../../effects/books.effects';
import { reducerMapper } from '../../reducers/mapper';
import {BookDetailsComponent} from '../book-details/book-details.component'
describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

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
      declarations: [BookSearchComponent, BookDetailsComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should not contain no books to show div block`, () => {
    expect( fixture.debugElement.query( By.css('.noBooks') ) ).toBe( null );
  });

  it('should not display any books initially', () => {
    expect( fixture.debugElement.query( By.css('.booksBlock') ) ).toBeFalsy();
  });

  it(`should show 'no books to show' in UI`, () => {
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    app.recentSearchs = ['demo'];

    fixture.detectChanges();    

    expect( fixture.debugElement.query( By.css('.noBooks') ).nativeElement.textContent ).toBe('No books to show');
  });

  it(`should show books block`, () => {
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    app.booksList = [ getSampleBook() ];

    fixture.detectChanges();
    
    expect( fixture.debugElement.query( By.css('.booksBlock') ) ).toBeTruthy();
  });
  
});

describe('Search Form Tests', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let de: DebugElement;
  let el: HTMLElement;

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
      declarations: [BookSearchComponent, BookDetailsComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents()
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query( By.css('form') );
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call form submit function',  ()=> {
    fixture.detectChanges();
    spyOn(component, 'getBookList');

    el = fixture.debugElement.query( By.css('.searchBtn') ).nativeElement;
    el.click();

    expect( component.getBookList ).toHaveBeenCalledTimes( 0 );
  });

  it('should throw error for empty search/initial state', () => {
    component.bookSearch.controls['bookName'].setValue('');

    expect( component.bookSearch.valid ).toBeFalsy();
  });
  
  it('should throw error for special characters', () => {
    component.bookSearch.controls['bookName'].setValue('adc#');

    expect( component.bookSearch.valid ).toBeFalsy();
  });

  it('should return a books list', ()=>{
    spyOn( component, 'getBookList').and.callFake( ()=>{      
      component.booksList = [getSampleBook()];
    });

    component.getBookList();

    expect( component.booksList.length ).toBeGreaterThan( 0 );
  });

  it('should show books list in UI', ()=>{
    spyOn( component, 'getBookList').and.callFake( ()=>{      
      component.booksList = [getSampleBook()];
    });
    component.getBookList();
    const booksAction = new ChangeBooks( component.booksList );
    component.getStoreRef().dispatch( booksAction );

    fixture.detectChanges();
    
    expect( fixture.debugElement.query( By.css('.booksBlock') ) ).toBeTruthy();
  });

  it('should call search books on valid form', () => {
    component.bookSearch.controls['bookName'].setValue('kalam');

    fixture.detectChanges();

    fixture.debugElement.query( By.css('.searchBtn') ).nativeElement.click();

    expect( component.errorMessage ).toBe('');
  });

  it('should show error message on invalid form submit', () => {
    component.bookSearch.controls['bookName'].setValue('');
    fixture.detectChanges();
    component.getBookList();

    expect( component.errorMessage ).toBe('Please enter a valid search text');
  });
});


export function getSampleBook() {
  return {
            title: 'Example Book',
            id: 'asad',
            authors: ['authorX'],
            currency: 'ISD',
            description: 'Sample Description',
            imageLink: '"http://books.google.com/books/content?id=vDJjDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            price: 200,
            publisher: 'publisherX'
          };
}