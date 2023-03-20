import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/admin/task/store/task.model';
import { TaskDetailDialogComponent } from './task-detail-dialog/task-detail-dialog.component';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {
  @Input() task!: Task;

  constructor(public dialog: MatDialog){}
  
  openTask(){
   const dialogRef = this.dialog.open(TaskDetailDialogComponent, {
      data: this.task,
      disableClose: true,
      width: '100vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
