import { createAction, props } from '@ngrx/store';
import { TaskGroup } from '../../task/store/task-group.model';
import { Task } from '../../task/store/task.model';
import { Project } from './project.model';
import { User } from 'src/app/auth/store/auth.model';

// export const loadAdminUsers = createAction(
//   'LOAD_ADMIN_USERS'
// );

// export const setAdminUsers = createAction(
//   'SET_ADMIN_USERS',
//   (users:User[]) => ({users})
// )

export const loadProjects = createAction(
  '[Project] Load Projects'
);

export const setProjects = createAction(
  'SET_PROJECTS',
  (projects:Project[]) => ({projects})
)

export const addProject = createAction(
  'ADD_PROJECTS',
  (project: Project) => ({project})
)

export const editProject = createAction(
  'EDIT_PROJECT',
  (project:Project, id:string) => ({project, id})
)

export const deleteProject = createAction(
  'DELETE_PROJECT',
  (id:string) => ({id})
)

export const setSelectProject = createAction(
  'SET_ACTIVE_PROJECT',
  (project: Project) => ({project})
)

export const setTaskGroups = createAction(
  'SET_TASK_GROUPS',
  (task_groups: TaskGroup[]) => ({task_groups})
)

export const editUpdatededProject = createAction(
  'EDIT_UPDATED_PROJECT',
  (project: Project, id:string) => ({project, id})
)

export const addTaskAction = createAction(
  'ADD_TASK_ACTION',
  (task:Task, project_id:string) => ({task, project_id})
)

export const sortTaskGroupAction = createAction(
  'SORT_TASK_GROUP_ACTION',
  (taskGroups: TaskGroup[]) => ({taskGroups})
)

export const getProjectById = createAction(
  'GET_PROJECT_BY_ID',
  (id:string) => ({id})
)




