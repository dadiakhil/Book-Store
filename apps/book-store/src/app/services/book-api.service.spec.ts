import { TestBed } from '@angular/core/testing';

import { BookApiService } from './book-api.service';
import { HttpClientModule } from '@angular/common/http';

describe('BookApiService', () => {
  let service: BookApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(BookApiService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
