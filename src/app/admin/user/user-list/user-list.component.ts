import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { selectedUsers } from '../store/user.selectors';
import { User } from '../store/user.model';
import { deleteUser, setUser } from '../store/user.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent {
  @Input() set users(users: User[]) {
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}
  displayedColumns: string[] = ['_id', 'name', 'email', 'action'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store:Store,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource(this.users);
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

  viewUser(user:User){
    this.store.dispatch(setUser(user))
    this.router.navigate(['/user', user._id]);
  }

  deleteUser(id:string){
    this.store.dispatch(deleteUser(id))
  }
}