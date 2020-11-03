import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { LoginService } from '../services/login.service';
import { AddBookService } from '../services/add-book.service';
import { UploadImageService } from '../services/upload-image.service';

interface MyObj {
  id: number;
}

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


  constructor(private loginService: LoginService, private addBookService:AddBookService, private uploadImageService:UploadImageService) { }

  onSubmit() {
  	this.addBookService.sendBook(this.newBook).subscribe(
  		res => {
        console.log("succes in sendBook res before : ",res);
        let obj: MyObj = JSON.parse(JSON.stringify(res));
        console.log("MyObj id value : ",obj.id);
        // console.log("typeof res : ",typeof res);
        // console.log("typeof res : ",res);
        // if (typeof res === 'object') console.log("res is an object");
        // if (typeof res === 'string') console.log("res is a string",JSON.parse(res));
        // console.log("succes in sendBook res id before : ",JSON.parse(JSON.parse(JSON.stringify(res))).id);
        this.uploadImageService.upload(obj.id);
  			this.bookAdded=true;
  			this.newBook = new Book();
  			this.newBook.active=true;
  			this.newBook.category="Management";
  			this.newBook.language="english";
        this.newBook.format="paperback";
        console.log("succes in sendBook res after : ",res);
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

fileEvent(event): void {
  this.uploadImageService.fileChangeEvent(event);
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
