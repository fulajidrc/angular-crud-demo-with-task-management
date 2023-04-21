import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AssignUser } from 'src/app/admin/task/store/assign_users.model';
import { assignUserToTask, unAssignUserToTask } from 'src/app/admin/task/store/task.actions';
import { Task } from 'src/app/admin/task/store/task.model';
import { selectedActiveTask } from 'src/app/admin/task/store/task.selectors';
import { loadAdminUsers, loadUsers } from 'src/app/admin/user/store/user.actions';
import { selectedAdminUsers, selectedUsers } from 'src/app/admin/user/store/user.selectors';
import { User } from 'src/app/auth/store/auth.model';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';

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
  // @Input() task!: Task;
  assignUser = false
  users$ = this.store.select(selectedAdminUsers)
  task$ = this.store.select(selectedActiveTask)
  user = ''
  constructor(
    private store:Store,
    public dialog: MatDialog
  ){
    this.store.dispatch(loadAdminUsers())
  }
  assignToUser(){
    this.assignUser = true
  }

  getUserName(user:AssignUser){
    return typeof user.assign_user == 'string' ? user.assign_user : user.assign_user?.name
  }

  taskAssignToUser(task:Task){
    const assignUser: AssignUser = {
      project: task.project,
      task: task._id,
      assign_user: this.user
    }
    this.store.dispatch(assignUserToTask(assignUser))
    this.assignUser = false;
  } 

  unassignUser(user:AssignUser){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Unassign User', 
        text: 'Are you sure want to unassign this user?'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(unAssignUserToTask(user._id ? user._id : ''))
      }
    });
  }
}
