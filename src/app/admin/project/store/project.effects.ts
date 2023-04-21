import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as ProjectActions from './project.actions';
import { Store } from '@ngrx/store';
import { ProjectService } from 'src/app/service';
import { selectedActiveProject, selectedProject, selectedTaskGroups } from './project.selectors';

@Injectable()
export class ProjectEffects {

  // loadAdminUsers$ = createEffect(() => {
  //   return this.actions$.pipe( 
  //     ofType(ProjectActions.loadProjects),
  //     withLatestFrom(this.store.select(selectedProject)),
  //     switchMap(([action, projects])=>{
  //       if(projects.length > 0){
  //         return EMPTY;
  //       }else{
  //         return this.projectService.getProject()
  //         .pipe(map(projects => ProjectActions.setProjects(projects)))
  //       }
  //     })
  //   );
  // });

  loadProjects$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(ProjectActions.loadProjects),
      withLatestFrom(this.store.select(selectedProject)),
      switchMap(([action, projects])=>{
        if(projects.length > 0){
          return EMPTY;
        }else{
          return this.projectService.getProject()
          .pipe(map(projects => ProjectActions.setProjects(projects)))
        }
      })
    );
  });

  addProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.addProject),
      withLatestFrom(this.store.select(selectedProject)),
      switchMap(([action, projects]) => 
        this.projectService.addProject(action.project)
        .pipe(map(project => ProjectActions.setProjects([...projects, project])))
      )
    )
  )

  editProject$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ProjectActions.editProject),
      withLatestFrom(this.store.select(selectedProject)),
      switchMap(([action, projects]) => 
        this.projectService.editProject(action.project, action.id)
        .pipe(switchMap(project => of(
            ProjectActions.setProjects(
              projects.map(item => item._id == action.id 
                ? {...item, title: project.title, description: project.description} 
                : {...item}
              )
            ),
            ProjectActions.editUpdatededProject(project, action.id)
        )
        ))
      )
    )
  )

  deleteProject$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ProjectActions.deleteProject),
      withLatestFrom(this.store.select(selectedProject)),
      switchMap(([action, projects]) => 
        this.projectService.deleteProject(action.id)
        .pipe(map(project => 
            ProjectActions.setProjects(
              projects.filter(item => item._id != action.id)
            )
        ))
      )
    )
  )

  sortTaskGroupAction$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ProjectActions.sortTaskGroupAction),
      withLatestFrom(this.store.select(selectedTaskGroups)),
      switchMap(([action, taskGroups])=>
        this.projectService.sortTaskGroup(action.taskGroups)
        .pipe(map(response => 
          ProjectActions.setTaskGroups(action.taskGroups)
        ))
      )
    )
  )

  getProjectById$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(ProjectActions.getProjectById),
      withLatestFrom(this.store.select(selectedActiveProject)),
      switchMap(([action, project])=>{
        if(project){
          return EMPTY;
        }else{
          return this.projectService.getProjectByID(action.id)
          .pipe(map(projectData => ProjectActions.setSelectProject(projectData)))
        }
      })
    );
  });

  constructor(
    private actions$: Actions,
    private store:Store,
    private projectService:ProjectService
  ) {}
}
