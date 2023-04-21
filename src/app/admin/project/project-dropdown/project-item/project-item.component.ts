import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { deleteProject, setSelectProject } from '../../store/project.actions';
import { Project } from '../../store/project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent {
  @Input() project!: Project;
  @Output() editProjectEmit: EventEmitter<Project> = new EventEmitter()
  // @Output() selectProjectEmit:EventEmitter<Project> = new EventEmitter();
  constructor(
    private store:Store,
    public dialog: MatDialog,
    private router: Router
  ){}
  editProject(){
    this.editProjectEmit.emit(this.project);
  }

  selectProject(){
    this.store.dispatch(setSelectProject(this.project))
    this.router.navigate(['/project', this.project._id])
  }

  deleteProject(){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Delete', 
        text: 'Are you sure want to delete this project?'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(deleteProject(this.project._id ? this.project._id : ''))
      }
    });
  }
}
