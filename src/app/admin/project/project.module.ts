import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { StoreModule } from '@ngrx/store';
import * as fromProject from './store/project.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects } from './store/project.effects';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDropdownComponent } from './project-dropdown/project-dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatirialModule } from 'src/app/matirial.module';
import { AddProjectComponent } from './add-project/add-project.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProjectItemComponent } from './project-dropdown/project-item/project-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { TaskGroupComponent } from './project-detail/task-group/task-group.component';
import { TaskDetailComponent } from './project-detail/task-group/task-detail/task-detail.component';
import { AddTaskComponent } from './project-detail/task-group/add-task/add-task.component';
import { TaskDialogComponent } from './project-detail/task-group/add-task/task-dialog/task-dialog.component';
import { TaskGroupActionComponent } from './project-detail/task-group/task-group-action/task-group-action.component';
import { TaskGroupButtonComponent } from './task-group-button/task-group-button.component';
import { TaskGroupDialogComponent } from './task-group-button/task-group-dialog/task-group-dialog.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TaskDetailDialogComponent } from './project-detail/task-group/task-detail/task-detail-dialog/task-detail-dialog.component';
import { TaskAssigneesComponent } from './project-detail/task-group/task-detail/task-assignees/task-assignees.component';
import { TaskDataComponent } from './project-detail/task-group/task-detail/task-data/task-data.component';

const routes: Routes = [
  {path: '', component: ProjectComponent}
]


@NgModule({
  declarations: [
    ProjectComponent,
    ProjectDropdownComponent,
    AddProjectComponent,
    ProjectItemComponent,
    ProjectDetailComponent,
    TaskGroupComponent,
    TaskDetailComponent,
    AddTaskComponent,
    TaskDialogComponent,
    TaskGroupActionComponent,
    TaskGroupButtonComponent,
    TaskGroupDialogComponent,
    TaskDetailDialogComponent,
    TaskAssigneesComponent,
    TaskDataComponent
  ],
  imports: [
    CommonModule,
    // StoreModule.forFeature(fromProject.projectFeatureKey, fromProject.reducer),
    // EffectsModule.forFeature([ProjectEffects]),
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatirialModule,
    FlexLayoutModule,
    SharedModule,
    AngularEditorModule
  ]
})
export class ProjectModule { }
