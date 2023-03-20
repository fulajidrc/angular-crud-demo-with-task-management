import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../store/project.model';
import { TaskGroupDialogComponent } from './task-group-dialog/task-group-dialog.component';

@Component({
  selector: 'app-task-group-button',
  templateUrl: './task-group-button.component.html',
  styleUrls: ['./task-group-button.component.scss']
})
export class TaskGroupButtonComponent {
  @Input() project!:Project

  constructor(public dialog: MatDialog){}
  addTaskGroup(){
    const dialogRef = this.dialog.open(TaskGroupDialogComponent, {
      data: {title: '', description: '', project: this.project._id,  index: this.project.task_groups?.length},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
}
