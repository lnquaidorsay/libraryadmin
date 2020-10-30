import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { LoginService } from '../services/login.service';
import { AddBookService } from '../services/add-book.service';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {

   newBook: Book = new Book();
   bookAdded: boolean;	
   disabled:boolean;
   checked:boolean;
   color:String;


  constructor(private loginService: LoginService, private addBookService:AddBookService) { }

  onSubmit() {
  	this.addBookService.sendBook(this.newBook).subscribe(
  		res => {
  			this.bookAdded=true;
  			this.newBook = new Book();
  			this.newBook.active=true;
  			this.newBook.category="Management";
  			this.newBook.language="english";
        this.newBook.format="paperback";
        console.log("succes in sendBook res : ",res);
  		},
  		error => {
  			console.log("error in sendBook : ",error);
  		}
  	);
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.loginService.sendMessage('Message from addNewBoobk Component to navbar Component!');
}

clearMessage(): void {
    // clear message
    this.loginService.clearMessage();
}

  ngOnInit(): void {
    this.sendMessage();
    this.bookAdded=false;
  	this.newBook.active=true;
  	this.newBook.category="Management";
  	this.newBook.language="english";
  	this.newBook.format="livre de poche";
  }

}
