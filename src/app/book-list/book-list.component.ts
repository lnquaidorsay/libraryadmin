import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { GetBookListService } from '../services/get-book-list.service';
import { LoginService } from '../services/login.service';
import { RemoveBookService } from '../services/remove-book.service';
//import Swal from 'sweetalert2/dist/sweetalert2.js';
import Swal from 'sweetalert2';

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
      private loginService: LoginService,
      private removeBookService: RemoveBookService,
    ) { }
    
    onSelect(book:Book) {
      this.selectedBook=book;
      this.router.navigate(['/viewBook', this.selectedBook.id]);
    }

    onSelect2(book:Book) {
      this.router.navigate(['/editBook', book.id]);
      // .then(s => location.reload())
      ;
    }
    getBookList() {
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

  ngOnInit() {
  	this.getBookList();
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.loginService.sendMessage('Message from bookList Component to navbar Component!');
}



updateSelected(checked: boolean) {
  if(checked) {
    this.allChecked = true;
    this.removeBookList=this.bookList.slice();
  } else {
    this.allChecked=false;
    this.removeBookList=[];
  }
}

updateRemoveBookList(checked:boolean, book:Book) {
  if(checked) {
    this.removeBookList.push(book);
  } else {
    this.removeBookList.splice(this.removeBookList.indexOf(book), 1);
  }
}

clearMessage(): void {
  this.loginService.clearMessage();
}

openDialog2(book:Book) {
  Swal.fire({
    title: 'Voulez-vous supprimer ce livre?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Supprimer!',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.value) {
       this.removeBookService.sendBook(book.id).subscribe(data => {
        Swal.fire(
          'Effectué!',
          'Le contact a été supprimé.',
          'success'
        )
        console.log("data return with remove : ",data);
       this.getBookList();
       //location.reload();
    },error => {
      console.log("Erreur lors de la suppression du contact : ",error);
    });
  } 
  })
}


removeSelectedBooks(){

}

}

