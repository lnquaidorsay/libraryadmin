import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class EditBookService {

  constructor(private http: HttpClient) { }

  sendBook(book:Book):Observable<any> {
    let url = "http://localhost:8181/book/update";
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
  		  'x-auth-token' : localStorage.getItem('xAuthToken')
      })
    };
    return this.http.post(url,JSON.stringify(book),httpOptions);
  }
}
