import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { updateTaskData } from 'src/app/admin/task/store/task.actions';
import { Task } from 'src/app/admin/task/store/task.model';
import { selectedActiveTask } from 'src/app/admin/task/store/task.selectors';

@Component({
  selector: 'app-task-detail-dialog',
  templateUrl: './task-detail-dialog.component.html',
  styleUrls: ['./task-detail-dialog.component.scss']
})
export class TaskDetailDialogComponent {
  @ViewChild('search') searchElement!: ElementRef;
  activeTask$ = this.store.select(selectedActiveTask)
  
  activeTitleInput=false
  constructor(
    public dialogRef: MatDialogRef<TaskDetailDialogComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: Task,
    private store:Store,
    private router: Router
  ) {
    //this.activeTask$
  }

  
}
