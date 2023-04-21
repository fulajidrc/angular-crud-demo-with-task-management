import { Action, createReducer, on } from '@ngrx/store';
import { TaskGroup } from './task-group.model';
import * as TaskActions from './task.actions';
import { Task } from './task.model';

export const taskFeatureKey = 'task';

export interface TaskState {
  taskGroup: TaskGroup[],
  activeTask?: Task,
}

export const initialState: TaskState = {
  taskGroup:[]
};

export const reducer = createReducer(
  initialState,

  on(TaskActions.loadTasks, state => state),
  on(TaskActions.setTasks, (state, {taskGroups}) => ({
    ...state,
    taskGroup: taskGroups
  })),
  on(TaskActions.setActiveTask, (state, {task}) => ({
    ...state,
    activeTask: task
  })),
  

);
