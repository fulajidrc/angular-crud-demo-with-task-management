import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskGroup } from 'src/app/admin/task/store/task-group.model';
import { Project } from '../../../store/project.model';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  @Input() project!:Project
  @Input() taskGroup!:TaskGroup
  constructor(public dialog: MatDialog){}
  addTask(){
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {title: '', description: '', project: this.project._id, task_group:this.taskGroup._id , index: this.taskGroup.tasks.length},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
}
