import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TaskGroup } from 'src/app/admin/task/store/task-group.model';
import { deleteTaskGroup } from 'src/app/admin/task/store/task.actions';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { Project } from '../../../store/project.model';
import { TaskGroupDialogComponent } from '../../../task-group-button/task-group-dialog/task-group-dialog.component';
import { TaskDialogComponent } from '../add-task/task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-group-action',
  templateUrl: './task-group-action.component.html',
  styleUrls: ['./task-group-action.component.scss']
})
export class TaskGroupActionComponent {
  @Input() project!:Project
  @Input() taskGroup!:TaskGroup

  constructor(
    public dialog: MatDialog,
    private store:Store
  ){}
  addTask(){
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {title: '', description: '', project: this.project._id, task_group:this.taskGroup._id , index: this.taskGroup.tasks.length},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  editTaskGroup(){
    const dialogRef = this.dialog.open(TaskGroupDialogComponent, {
      data:this.taskGroup,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  removeTaskGroup(){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Delete', 
        text: 'Are you sure want to delete this List?'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(deleteTaskGroup(this.taskGroup._id ? this.taskGroup._id : ''))
      }
    });
  }
}
