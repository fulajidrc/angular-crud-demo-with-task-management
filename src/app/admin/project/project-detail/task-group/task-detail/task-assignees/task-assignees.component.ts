import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AssignUser } from 'src/app/admin/task/store/assign_users.model';
import { Task } from 'src/app/admin/task/store/task.model';
import { loadUsers } from 'src/app/admin/user/store/user.actions';
import { selectedUsers } from 'src/app/admin/user/store/user.selectors';

export interface Vegetable {
  name: string;
}

@Component({
  selector: 'app-task-assignees',
  templateUrl: './task-assignees.component.html',
  styleUrls: ['./task-assignees.component.scss']
})
export class TaskAssigneesComponent {
  // @Input() users!: AssignUser[]
  @Input() task!: Task;
  assignUser = false
  users$ = this.store.select(selectedUsers)
  user = ''
  constructor(private store:Store){
    this.store.dispatch(loadUsers())
  }
  assignToUser(){
    this.assignUser = true
  }

  getUserName(user:AssignUser){
    return typeof user.assign_user == 'string' ? user.assign_user : user.assign_user?.name
  }

  taskAssignToUser(){

  }
}
