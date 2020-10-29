import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import 'rxjs/add/operator/map';
import { map, switchMap } from 'rxjs/operators';
import { Observable, Subject, Subscription, throwError } from 'rxjs';

interface MyObj {
  token: string;
}

interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   credential = {'username':'', 'password' : ''};
   loggedIn = false;

  
   

  constructor(private loginService: LoginService) { }

  onSubmit() {
  	this.loginService.sendCredential(this.credential.username, this.credential.password).subscribe(
  		res => {
        console.log("display res value : ",res);
        console.log('json stringify res : ',JSON.stringify(res));
        let obj: MyObj = JSON.parse(JSON.stringify(res));
        console.log("MyObj token value : ",obj.token);
        console.log("My credential : ",this.credential);
        localStorage.setItem("xAuthToken", obj.token); 
        this.loggedIn = true;
        this.sendMessage();
        // this.loginService.user.next(this.credential);
        // this.loginService.user.next
       // https://jasonwatmore.com/post/2016/12/01/angular-2-communicating-between-components-with-observable-subject
       //https://stackoverflow.com/questions/42567674/share-data-between-components-using-a-service-in-angular2
       //https://stackoverflow.com/questions/46612905/angular-service-with-subject-observable-calling-next-is-not-seen-by-component?rq=1
       //https://stackoverflow.com/questions/43191679/cannot-read-property-next-of-undefined
       //location.reload();
  		},
  		error => {
  			console.log(error);
  		}
  	);
  }


  sendMessage(): void {
    // send message to subscribers via observable subject
    this.loginService.sendMessage('Message from Login Component to navbar Component!');
}

clearMessage(): void {
    // clear message
    this.loginService.clearMessage();
}

  ngOnInit() {
    // this.loginService.checkSession().subscribe(
  	// 	res => {
    //     this.loggedIn=true;
    //     console.log('success loggedIn value res : ',res);
    //     console.log('success loggedIn value : ',this.loggedIn);
  	// 	},
  	// 	error => {
    //     this.loggedIn=false;
    //     console.log('error loggedIn value error : ',error);
    //     console.log('error loggedIn value : ',this.loggedIn);
  	// 	}
  	// );
  }

}
