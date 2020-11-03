import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetBookListService {

  constructor(private http: HttpClient) { }

  getBookList() {
    let url = "http://localhost:8181/book/bookList";
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
  		  'x-auth-token' : localStorage.getItem('xAuthToken')
      })
    };
    return this.http.get(url,httpOptions);
  }
}
