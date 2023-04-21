import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/admin/task/store/task.model';
import { TaskDetailDialogComponent } from './task-detail-dialog/task-detail-dialog.component';
import { AssignUser } from 'src/app/admin/task/store/assign_users.model';
import { Store } from '@ngrx/store';
import { selectedActiveTask } from 'src/app/admin/task/store/task.selectors';
import { setActiveTask } from 'src/app/admin/task/store/task.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {
  //@Input() task!: Task;
  taskData!:Task;
  @Input() set task(task: Task) {
    ///this.store.dispatch
    this.taskData = task
    console.log('on update task',this.openTaskDialog);
    if(this.openTaskDialog){
      console.log('task details c',task);
      this.store.dispatch(setActiveTask(task))
    }
    this.checkDialogPosition(task);
  }
  constructor(
    public dialog: MatDialog,
    private store:Store,
    private router: Router
  ){}
  openTaskDialog = false
  openTask(task:Task){
   this.store.dispatch(setActiveTask(task))
   this.router.navigate([`/project/${task.project}/task/${task._id}`])
  }

  checkDialogPosition(task:Task){
    console.log('checkDialogPosition',this.openTaskDialog);
  }

  getFirstChar(user:AssignUser){
    return typeof user.assign_user == 'string' ? user.assign_user.charAt(0) : user.assign_user?.name.charAt(0)
  }

  getFullName(user:AssignUser){
    let string = ''
    string = typeof user.assign_user == 'string' 
    ? user.assign_user 
    : user.assign_user && user.assign_user.name ? user.assign_user.name : '';
    return string;
  }

  //typeof user?.assign_user != 'string' ? user?.assign_user?.name : 'test'

  //{{user?.assign_user?.name?.chartAt(0)}}
}
