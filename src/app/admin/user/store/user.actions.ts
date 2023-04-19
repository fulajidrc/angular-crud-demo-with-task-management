import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const loadUsers = createAction(
  '[User] Load Users'
);


export const setUsers = createAction(
  'SET_USERS',
  (users:User[]) => ({users})
);

export const getUser = createAction(
  'GET_USER',
  (id: string) => ({id})
)

export const getUserFromStore = createAction(
  'GET_USER_FROM_STORE',
  (id: string) => ({id})
)

export const setUser = createAction(
  'SET_USER',
  (user:User) => ({user})
)

export const setPageUsers = createAction(
  'SET_PAGE_USERS',
  (users:User[], curruntPage:number, totalUsers:number) => ({users, curruntPage, totalUsers})
);


export const deleteUser = createAction(
  'DELETE_USER',
  (id: string) => ({id})
)

export const addUser = createAction(
  'ADD_USER',
  (user:User) => ({user})
)

export const updateUser = createAction(
  'UPDATE_USER',
  (id:string,user:User) => ({id,user})
)
