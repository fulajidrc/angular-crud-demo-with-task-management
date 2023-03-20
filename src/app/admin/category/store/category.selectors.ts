import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCategory from './category.reducer';

export const selectCategoryState = createFeatureSelector<fromCategory.CategoryState>(
  fromCategory.categoryFeatureKey
);

export const selectedCategories = createSelector(
  selectCategoryState,
  state => state.categories
)
