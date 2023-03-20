import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { Category } from '../../category/store/category.model';
import { AddPostComponent } from '../add-post/add-post.component';
import { deletePost } from '../store/post.actions';
import { Post } from '../store/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  //@Input() posts:Post[] = []
  @Input() set posts(posts: Post[]) {
    this.dataSource = new MatTableDataSource(posts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = ['_id', 'title','category', 'description', 'action'];
  dataSource!: MatTableDataSource<Post>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store:Store,
    public dialog: MatDialog
  ){
    this.dataSource = new MatTableDataSource(this.posts);
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

  deletePost(id:string){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Delete', 
        text: 'Are you sure want to delete this record?'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(deletePost(id))
      }
    });
  }

  crateCategoryDialog(post:Post){
   const category = typeof post.category == 'string' ? post.category : post.category?._id 
    const dialogRef = this.dialog.open(AddPostComponent, {
      data: {...post, category: category},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getCategoryTitle(post:Post){
    return typeof post.category == 'string' ? post.category : post.category?.title 
  }
}
