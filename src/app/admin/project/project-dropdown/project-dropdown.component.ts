import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AddProjectComponent } from '../add-project/add-project.component';
import { loadProjects } from '../store/project.actions';
import { Project } from '../store/project.model';
import { selectedActiveProject, selectedProject } from '../store/project.selectors';

@Component({
  selector: 'app-project-dropdown',
  templateUrl: './project-dropdown.component.html',
  styleUrls: ['./project-dropdown.component.scss']
})
export class ProjectDropdownComponent {
  projects$ = this.store.select(selectedProject)
  activeProject$ = this.store.select(selectedActiveProject)
  selected = 'option2';
  selectProjectText = 'Select Project'
  constructor(
    private store:Store,
    public dialog: MatDialog
  ){
    this.store.dispatch(loadProjects())
  }

  addProject(project:Project){
    const dialogRef = this.dialog.open(AddProjectComponent, {
      data: project,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // selectProject(project:Project){
  //   //this.selectProjectText = project.title
  //   this.store.dispatch()
  // }
}
