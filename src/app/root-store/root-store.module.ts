import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {reducer as authReducer}  from '../auth/store/auth.reducer'
import { Action, ActionReducer, ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AuthModule } from '../auth/auth.module';
const INIT_ACTION = "@ngrx/store/init";
const UPDATE_ACTION = "@ngrx/store/update-reducers";
const reducers: ActionReducerMap<any> = {
  authReducer: authReducer,
};

const mergeReducer = (state: any, rehydratedState: any, action: Action): any => {
  if ((action.type === INIT_ACTION || action.type === UPDATE_ACTION) && rehydratedState) {
    state = {...state, ...rehydratedState};
  }

  return state;
}

// step 2: wrap localStorageSync in an exported function
function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [
      { auth: ['user', 'isLogin']}, 
    ],
    rehydrate: true,
    mergeReducer
  })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    AuthModule, 
    StoreModule.forRoot(
      reducers,
      { metaReducers }
    )
  ]
})
export class RootStoreModule { }
