import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login.service';
interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})



export class NavBarComponent implements OnInit {

  loggedIn = false;
  //user:User;
  // @Output()
  // sendLoggedIn = new EventEmitter();
  message: any;
  subscription: Subscription;


  constructor(private loginService:LoginService, private router:Router) {
    // subscribe to login component messages
    this.subscription = this.loginService.getMessage().subscribe(message => { this.message = message; });
   }

   logout() {
    this.loginService.logout().subscribe(
      res => {
        console.log('res return with logout : ',res);
        location.reload();
      },
      error => {
        //location.reload();
        console.log('erreur return22 : ',error);
        location.reload();
      }
    );

    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    // this.loginService.checkSession().subscribe(
    //   res => {
    //     this.loggedIn=true;
    //     console.log('success loggedIn value navbar: ',this.loggedIn);
    //   },
    //   error => {
    //     this.loggedIn=false;
    //     console.log('error loggedIn value navbar: ',this.loggedIn);
    //   }
    // );

    // this.loginService.user.subscribe(user => this.user = user)

    // this.loginService.user.subscribe(user => this.loggedIn = !!user) 


    //this.loggedIn = localStorage.getItem('xAuthToken') ? true : false; 
  }

  toggleDisplay() {
  	this.loggedIn = !this.loggedIn;
  }

}
