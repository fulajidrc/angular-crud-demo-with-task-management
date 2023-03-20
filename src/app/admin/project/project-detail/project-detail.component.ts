import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Project } from '../store/project.model';
import { selectedTaskGroups } from '../store/project.selectors';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent {
  @Input() project!: Project;
  taskGroups$ = this.store.select(selectedTaskGroups) 
  constructor(private store:Store){}
}
