import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../../material/material.module';
import { RoutingModule } from '../routing/routing.module';
import { MyCartComponent } from './my-cart.component';
import { getSampleBook } from '../../book/book-search/book-search.component.spec';

import { Book } from '../../models/book';

import { StoreModule } from '@ngrx/store';
import { reducerMapper } from '../../reducers/mapper';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from '../../effects/books.effects';
import { AddBookToCartAction } from '../../actions/cart.actions';

describe('MyCartComponent', () => {
  let component: MyCartComponent;
  let fixture: ComponentFixture<MyCartComponent>;

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
      declarations: [ MyCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should show 'No Books added to cart block' - if no cart items`, ()=> {
    component.cartDetails = [];

    fixture.detectChanges();

    expect( fixture.debugElement.query( By.css('.noCartItems') ) ).toBeTruthy();
  });

  it(`should not show 'No Books added to cart block' - if cart items exist`, ()=> {
    addSampleBookToCart( component, fixture );
    
    expect( fixture.debugElement.query( By.css('.noCartItems') ) ).toBeFalsy();
  });

  it('should show cart items', ()=> {
    addSampleBookToCart( component, fixture );

    expect( fixture.debugElement.query( By.css('.cartBlock') ) ).toBeTruthy();
  });

  it('should show cart total', ()=> {
    addSampleBookToCart( component, fixture );

    expect( component.cartValue ).toBe( component.cartDetails[0].price );
  });

  it('should show address block if delivery details doesnt exist', ()=> {
    component.payNow();

    expect( component.expandAddressBlock ).toBe( true );
  });

  it('shouldnt show address block if delivery details exist', ()=> {
    makePayment( component, fixture );
    
    expect( component.expandAddressBlock ).toBe( false );
  });

  it(`should show 'No Books added to cart block' after payment`, ()=> {
    makePayment( component, fixture );

    expect( fixture.debugElement.query( By.css('.noCartItems') ) ).toBeTruthy();
  });

  it(`shouldn't show cart details after payment`, ()=> {
    makePayment( component, fixture );

    expect( fixture.debugElement.query( By.css('.cartBlock') ) ).toBeFalsy();
  });

  it('should remove book from cart', () => {
    const sampleBook = getSampleBook();
    const addToCartAction = new AddBookToCartAction( sampleBook );
    component.getStoreObj().dispatch( addToCartAction );

    component.removeBookFromCart( sampleBook.id );
    component.ngOnInit();

    expect( component.cartDetails.length ).toBe( 0 );
  });
});
function makePayment(comp, fixture) {
  addSampleBookToCart( comp, fixture );
  comp.name = "XXXX";
  comp.payNow();
  
  fixture.detectChanges();
}

function addSampleBookToCart( comp, fixture) {
  const sampleObj = getSampleCartObj();

  const cartAction = new AddBookToCartAction( sampleObj[0] );

  comp.getStoreObj().dispatch( cartAction );
  
  fixture.detectChanges();
}

export function getSampleCartObj(): Book[] {
  const sampleBook: Book = getSampleBook();
  sampleBook.deliveryAddress = {
    address: 'asdasd',
    id: 123,
    mobileNo: 990880,
    name: 'XXXX'
  };

  return [sampleBook];
}