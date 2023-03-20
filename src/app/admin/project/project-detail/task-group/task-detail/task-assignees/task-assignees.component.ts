import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, startWith } from 'rxjs';
import { AssignUser } from 'src/app/admin/task/store/assign_users.model';
import { selectedUsers } from 'src/app/admin/user/store/user.selectors';
import { User } from 'src/app/auth/store/auth.model';

export interface Vegetable {
  name: string;
}

@Component({
  selector: 'app-task-assignees',
  templateUrl: './task-assignees.component.html',
  styleUrls: ['./task-assignees.component.scss']
})
export class TaskAssigneesComponent {
  @Input() users!: AssignUser[]
  users$ = this.store.select(selectedUsers)

  myControl = new FormControl('');

  filteredOptions!: Observable<User[]>;

  ngOnInit() {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    // );
  }
  constructor(private store:Store){}

  // private _filter(value: User): User[] {
  //   const filterValue = value.name.toLowerCase();
  //   // return this.users$.subscribe(users)
  //   //return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }
  assignToUser(){
    alert('assign user');
  }

  getUserName(user:AssignUser){
    return typeof user.assign_user == 'string' ? user.assign_user : user.assign_user?.name
  }
}
