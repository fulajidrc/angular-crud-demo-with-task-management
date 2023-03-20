import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { deleteCategory } from '../store/category.actions';
import { Category } from '../store/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
 // @Input() categories:Category[] = []

  @Input() set categories(categories: Category[]) {
    this.dataSource = new MatTableDataSource(categories);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = ['_id', 'title', 'description', 'action'];
  dataSource!: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store:Store,
    public dialog: MatDialog
  ){
    this.dataSource = new MatTableDataSource(this.categories);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewUser(user:Category){
    // this.store.dispatch(setUser(user))
    // this.router.navigate(['/user', user._id]);
  }

  deleteUser(id:string){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Delete', 
        text: 'Are you sure want to delete this record?'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(deleteCategory(id))
      }
    });
  }

  crateCategoryDialog(category:Category){
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      data: category,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
