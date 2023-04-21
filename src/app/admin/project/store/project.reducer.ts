import { Action, createReducer, on } from '@ngrx/store';
import { TaskGroup } from '../../task/store/task-group.model';
import * as ProjectActions from './project.actions';
import { Project } from './project.model';
import { User } from 'src/app/auth/store/auth.model';

export const projectFeatureKey = 'project';

export interface ProjectState {
  projects:Project[],
  project?:Project,
  task_groups: TaskGroup[],
  adminUsers:User[]
}

export const initialState: ProjectState = {
  projects: [],
  task_groups: [],
  adminUsers: []
};


export const reducer = createReducer(
  initialState,
  on(ProjectActions.loadProjects, state => state),
  on(ProjectActions.setProjects, (state, {projects}) => ({
    ...state, projects: projects
  })),
  on(ProjectActions.setSelectProject, (state, {project}) => ({
    ...state,
    project: project,
    task_groups: project.task_groups ? project.task_groups : []
  })),
  on(ProjectActions.editUpdatededProject, (state, {project, id}) => {
    if(project._id == id){
      return {
        ...state,
        project: project
      }
    }else{
      return {
        ...state,
      }
    }
    
  }),
  on(ProjectActions.setTaskGroups, (state, {task_groups}) => {
    console.log(task_groups);
     return {
        ...state,
        task_groups: task_groups,
        project: {
          title: state.project ? state.project.title : '', 
          description: state.project? state.project.description : '',
          task_groups: task_groups 
        }
      }
    }
  ),
  
);
