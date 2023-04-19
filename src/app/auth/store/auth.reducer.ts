import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from './auth.model';

export const authFeatureKey = 'auth';

export interface AuthState {
  user?:User,
  isLogin: boolean
}

export const initialState: AuthState = {
  user: {name: 'test name', email: 'test email', _id: 'fsdfsfs', role: 'user'},
  isLogin: false
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.setAuthUser, (state, {user}) => ({...state, user: user})),
  on(AuthActions.setLoginUser, (state, {status})=> ({...state, isLogin: status}))
);
