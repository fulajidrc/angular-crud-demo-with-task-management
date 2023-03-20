import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey
);

export const selectedAuthUser = createSelector(
  selectAuthState, state => state.user
)

export const selectedUserIsLogin = createSelector(
  selectAuthState, state => state.isLogin
)
