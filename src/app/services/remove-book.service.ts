import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemoveBookService {

  constructor(private http: HttpClient) { }

  sendBook(bookId: number):Observable<any> {
    let url = "http://localhost:8181/book/remove";
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
  		  'x-auth-token' : localStorage.getItem('xAuthToken')
      })
    };
    return this.http.post(url,bookId,httpOptions);
  }
}
