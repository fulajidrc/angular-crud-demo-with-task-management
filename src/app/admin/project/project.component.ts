import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectedActiveProject } from './store/project.selectors';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  project$ = this.store.select(selectedActiveProject);
  constructor(private store:Store){}
} 
