import { Action, createReducer, on } from '@ngrx/store';
import * as CategoryActions from './category.actions';
import { Category } from './category.model';

export const categoryFeatureKey = 'category';

export interface CategoryState {
  categories: Category[]
}

export const initialState: CategoryState = {
  categories: []
};

export const reducer = createReducer(
  initialState,

  on(CategoryActions.loadCategorys, state => state),
  
  on(CategoryActions.setCategories, (state, {categories}) => ({...state, categories: categories})),
  on(CategoryActions.storeCategory, (state, {category}) => ({
    ...state,
    categories: [...state.categories, category]
  }))
);
