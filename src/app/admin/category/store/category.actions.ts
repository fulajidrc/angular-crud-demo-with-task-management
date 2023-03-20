import { createAction, props } from '@ngrx/store';
import { Category } from './category.model';

export const loadCategorys = createAction(
  '[Category] Load Categorys'
);

export const setCategories = createAction(
  'SET_CATEGORIES',
  (categories: Category[]) => ({categories})
)

export const addCategory = createAction(
  'ADD_CATEGORY',
  (category:Category) => ({category})
)

export const storeCategory = createAction(
  'STORE_CATEGORY',
  (category:Category) => ({category})
)


export const editCategory = createAction(
  'UPDATE_CATEGORY',
  (category: Category, id: string) => ({category, id})
)

export const deleteCategory = createAction(
  'DELETE_CATEGORY',
  (id:string) => ({id})
)





