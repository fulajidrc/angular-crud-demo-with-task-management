import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { RouterModule, Routes } from '@angular/router';
import { MatirialModule } from 'src/app/matirial.module';
import { TaskListComponent } from './task-list/task-list.component';
import { StoreModule } from '@ngrx/store';
import * as fromTask from './store/task.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './store/task.effects';
import { TaskDetailComponent } from './task-list/task-detail/task-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TaskComponent
  }
]

@NgModule({
  declarations: [
    TaskComponent,
    TaskListComponent,
    TaskDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatirialModule,
    
  ],
  exports:[TaskListComponent]
})
export class TaskModule { }
