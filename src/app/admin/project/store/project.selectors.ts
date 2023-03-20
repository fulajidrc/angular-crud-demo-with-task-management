import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProject from './project.reducer';

export const selectProjectState = createFeatureSelector<fromProject.ProjectState>(
  fromProject.projectFeatureKey
);

export const selectedProject = createSelector(
  selectProjectState,
  state => state.projects
)

export const selectedActiveProject = createSelector(
  selectProjectState,
  state => state.project
)

export const selectedTaskGroups = createSelector(
  selectProjectState,
  state => state.task_groups
)
