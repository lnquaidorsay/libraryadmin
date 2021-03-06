import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetBookService {

  constructor(private http: HttpClient) { }

  getBook(id:number):Observable<any> {
    let url = "http://localhost:8181/book/"+id;
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
  		  'x-auth-token' : localStorage.getItem('xAuthToken')
      })
    };
    return this.http.get(url,httpOptions);
  }
}
