import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewBookComponent } from './add-new-book/add-new-book.component';
import { BookListComponent } from './book-list/book-list.component';
import { LoginComponent } from './login/login.component';
import { ViewBookComponent } from './view-book/view-book.component';

const routes: Routes = [
  {
		path : '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'addNewBook',
		component: AddNewBookComponent
	},
	{
		path: 'bookList',
		component: BookListComponent
	},
	{
		path: 'viewBook/:id',
		component: ViewBookComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
