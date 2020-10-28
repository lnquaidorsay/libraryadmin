import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import 'rxjs/add/operator/map';
import { map, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

interface MyObj {
  token: string;
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
        localStorage.setItem("xAuthToken", obj.token);
  			this.loggedIn = true;
  			//location.reload();
  		},
  		error => {
  			console.log(error);
  		}
  	);
  }

  ngOnInit() {
  }

}
