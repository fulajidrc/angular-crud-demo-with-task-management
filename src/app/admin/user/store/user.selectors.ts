import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.UserState>(
  fromUser.userFeatureKey
);

export const selectedUsers = createSelector(
  selectUserState,
  (state) => state.users
)

export const selectedUser = createSelector(
  selectUserState,
  (state) => state.user
)


