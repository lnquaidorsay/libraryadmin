import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})



export class LoginService {

  constructor(private http: HttpClient) { }

  subject = new Subject<any>();

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }

  user: Subject<User>;

  sendCredential(username: string, password: string) {
  	let url = "http://localhost:8181/token";
  	let encodedCredentials = btoa(username+":"+password);
    let basicHeader = "Basic "+encodedCredentials;
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
  		  'Authorization' : basicHeader
      })
    };
  	let myheaders = new Headers ({
  		'Content-Type' : 'application/x-www-form-urlencoded',
  		'Authorization' : basicHeader
  	});

    // return this.http.get(url, {headers: myheaders});
    return this.http.get(url,httpOptions);

  }

  checkSession() {
    let url = "http://localhost:8181/checkSession";

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
  		  'x-auth-token' : localStorage.getItem('xAuthToken')
      })
    };
    
    // let headers = new Headers ({
    //   'x-auth-token' : localStorage.getItem('xAuthToken')
    // });

    //return this.http.get(url, {headers: headers});
    return this.http.get(url,httpOptions);
  }

  logout() {
    let url = "http://localhost:8181/user/logout";

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
  		  'x-auth-token' : localStorage.getItem('xAuthToken')
      })
    };

    return this.http.post(url, '', httpOptions);
  }

}
