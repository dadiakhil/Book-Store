import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavComponent } from './side-nav.component';
import { APP_BASE_HREF } from '@angular/common';

import { RoutingModule } from '../routing/routing.module';
import { MaterialModule } from '../material/material.module';
import{SideNavListComponent} from './side-nav-list/side-nav-list.component';
import { BookSearchComponent } from '../book/book-search/book-search.component';
import { BookDetailsComponent } from '../book/book-details/book-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavComponent ,
        SideNavListComponent,
        BookSearchComponent,
      BookDetailsComponent],
        imports:[MaterialModule,
        RoutingModule,
      FormsModule,ReactiveFormsModule,
    NoopAnimationsModule],
    providers: [
      { provide: APP_BASE_HREF, useValue: '/'}
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
