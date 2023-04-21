import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTask from './task.reducer';

export const selectTaskState = createFeatureSelector<fromTask.TaskState>(
  fromTask.taskFeatureKey
);

export const selectedTaskGroups = createSelector(
  selectTaskState,
  state => state.taskGroup
)

export const selectedActiveTask = createSelector(
  selectTaskState,
  state => state.activeTask
)
