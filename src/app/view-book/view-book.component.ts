import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from '../models/book';
import { GetBookService } from '../services/get-book.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {

  private book:Book = new Book();
  pbook:any;
  private bookId: number;

  constructor(private getBookService:GetBookService,
    private route:ActivatedRoute, 
    private router:Router,
    private loginService: LoginService) { }

  ngOnInit() {
  	this.route.params.forEach((params: Params) => {
  		this.bookId = Number.parseInt(params['id']);
  	});

  	this.getBookService.getBook(this.bookId).subscribe(
  		res => {
        console.log("View book success : ",res);
  			this.pbook = res;
  		},
  		error => {
  			console.log("View book error : ",error);
  		}
  	);

  	
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.loginService.sendMessage('Message from viewBookList Component to navbar Component!');
}

clearMessage(): void {
  this.loginService.clearMessage();
}

}
