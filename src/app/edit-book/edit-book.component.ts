import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { UploadImageService } from '../services/upload-image.service';
import { EditBookService } from '../services/edit-book.service';
import { GetBookService } from '../services/get-book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

interface MyObj {
  id: number;
}

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

   bookId: number;
   book: Book = new Book();
   bookUpdated: boolean;
   disabled:boolean;
   checked:boolean;
   color:String;

  constructor(
  	private uploadImageService: UploadImageService,
  	private editBookService: EditBookService,
  	private getBookService: GetBookService,
  	private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
    ) { }

    onSubmit() {
      this.editBookService.sendBook(this.book).subscribe(
        data => {
          let obj: MyObj = JSON.parse(JSON.stringify(data));
          this.uploadImageService.modify(obj.id);
          this.bookUpdated=true;
        },
        error => {
          console.log("sendbook update error : ",error);
        }
      );
    }
    
    sendMessage(): void {
      // send message to subscribers via observable subject
      this.loginService.sendMessage('Message from editBookList Component to navbar Component!');
  }
  
  clearMessage(): void {
    this.loginService.clearMessage();
  }

  ngOnInit(): void {
    this.bookId=+this.route.snapshot.params['id'];

    this.getBookService.getBook(this.bookId)
    .subscribe(
      data=>{
        console.log("edit book success : ",data);
        this.book=data
      },
  		error => {
  			console.log("edit book error : ",error);
  		}
        );
  }

  fileEvent(event): void {
    this.uploadImageService.fileChangeEvent(event);
  }


}
