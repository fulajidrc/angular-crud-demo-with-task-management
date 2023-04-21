import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectedActiveProject } from './store/project.selectors';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../task/store/task.model';
import { TaskDetailDialogComponent } from './project-detail/task-group/task-detail/task-detail-dialog/task-detail-dialog.component';
import { getActiveTaskById } from '../task/store/task.actions';
import { getProjectById } from './store/project.actions';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  project$ = this.store.select(selectedActiveProject);
  private routeSub!: Subscription;
  constructor(
    private store:Store,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ){}

  ngOnInit(){
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      const id = params.id;
      if(id){
        this.store.dispatch(getActiveTaskById(id))
        this.openTask();
      }
      const projectId = params.project_id
      if(projectId){
        this.store.dispatch(getProjectById(projectId));
      }
    });
  } 
  
  openTaskDialog = false
  openTask(){
   //this.store.dispatch(setActiveTask(task))
   this.openTaskDialog = true 
   //console.log('openTask 1', this.openTaskDialog);
   const dialogRef = this.dialog.open(TaskDetailDialogComponent, {
      //data: task,
      disableClose: true,
      width: '100vw'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.openTaskDialog = false
    });
    console.log('openTask 2', this.openTaskDialog);
  }
} 
