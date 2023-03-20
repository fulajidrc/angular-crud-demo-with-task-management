import { createAction, props } from '@ngrx/store';
import { Auth, User } from './auth.model';

export const loadAuths = createAction(
  '[Auth] Load Auths'
);

export const loginAction = createAction(
  'LOGIN_ACTION',
  (user:Auth) => ({user})
)

export const setAuthUser = createAction(
  'SET_AUTH_ACTION',
  (user:User) => ({user})
)

export const setLoginUser = createAction(
  'SET_LOGIN_STATUS_ACTION',
  (status:boolean) => ({status})
)

export const logoutAction = createAction(
  'LOGOUT_ACTION',
)



// export const loadAuthsSuccess = createAction(
//   '[Auth] Load Auths Success',
//   props<{ data: any }>()
// );

// export const loadAuthsFailure = createAction(
//   '[Auth] Load Auths Failure',
//   props<{ error: any }>()
// );
