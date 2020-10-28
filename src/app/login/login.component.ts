import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

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
        // localStorage.setItem("xAuthToken", res.json().token);
        // let token = `${res.headers.get(token)}`
        // const keys = res.headers.keys();
        // localStorage.setItem("xAuthToken", res;
  			this.loggedIn = true;
  			//location.reload();
  		},
  		error => {
  			console.log(error);
  		}
  	);
  }

  getCurrentTime() {
    return this.loginService.sendCredential(this.credential.username, this.credential.password)
        .pipe(map((res:Response) => res.json()));
}

  ngOnInit() {
  }

}
