import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from './user.model';

export const userFeatureKey = 'user';

export interface UserState {
  users: User[],
  pageUsers: User[],
  curruntPage: number,
  totalUsers:number,
  user?: User
}

export const initialState: UserState = {
  users: [],
  pageUsers: [],
  curruntPage: 0,
  totalUsers: 0
};

export const reducer = createReducer(
  initialState,

  on(UserActions.loadUsers, state => state),
  on(UserActions.setUsers, (state, {users} )=> ({
    ...state,
    users: users
  })),
  on(UserActions.setUser, (state, {user})=> ({...state, user: user}))

  // on(UserActions.loadUsersSuccess, (state, action) => state),
  // on(UserActions.loadUsersFailure, (state, action) => state),

);
