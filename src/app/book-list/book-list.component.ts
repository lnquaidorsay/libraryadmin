import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { GetBookListService } from '../services/get-book-list.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  private selectedBook : Book;
	private checked: boolean;
  private bookList: Book[];
  pbookList;
	private allChecked: boolean;
	private removeBookList: Book[] = new Array();

  constructor(
  		private getBookListService: GetBookListService,
      private router:Router,
      private loginService: LoginService
    ) { }
    
    onSelect(book:Book) {
      this.selectedBook=book;
      this.router.navigate(['/viewBook', this.selectedBook.id]);
    }

  ngOnInit() {
  	this.getBookListService.getBookList().subscribe(
  		res => {
        console.log("List book : ",res);
        this.pbookList=res
      //   res.forEach(function (value) {
      //     console.log("Book obtained : ",value);
      // });
        // this.bookList=res.json();
        //this.bookList=res;
  		}, 
  		error => {
  			console.log("List book error : ",error);
  		}
  	);
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.loginService.sendMessage('Message from bookList Component to navbar Component!');
}


updateSelected(event) {

}

updateRemoveBookList(event, bk) {

}

clearMessage(): void {
  this.loginService.clearMessage();
}

openDialog(book:Book) {

}

removeSelectedBooks() {

}

}
