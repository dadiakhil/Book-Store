import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookApiService {

  constructor(private http:HttpClient) { }
  searchBooks(searchString:string): Observable<any> {
    return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=${searchString}&key=AIzaSyCp0eK9W8R_LmhNx8baXA6mfdNy12FKFU0`)
  }
}
