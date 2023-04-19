import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, withLatestFrom, switchMap, mergeMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as UserActions from './user.actions';
import { Store } from '@ngrx/store';
import { selectedUsers } from './user.selectors';
import { AuthService, UserService } from 'src/app/service';
import { setAuthUser } from 'src/app/auth/store/auth.actions';
import { User } from './user.model';
import { selectedAuthUser } from 'src/app/auth/store/auth.selectors';


@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(UserActions.loadUsers),
      withLatestFrom(this.store.select(selectedUsers)),
      switchMap(([action, userFromStore]) => {
        if(userFromStore.length > 0){
          return EMPTY
        }else{
          return this.userService.getUsers().pipe(
            switchMap(users => of(
              UserActions.setUsers(users),
            ))
          );
        }
      }) 
    );
  });

  getUser$ = createEffect(() =>
    this.actions$.pipe( 
      ofType(UserActions.getUser),
      withLatestFrom(this.store.select(selectedUsers)),
      switchMap(([action, userFromStore]) => {
        if(userFromStore.length > 0){
          return EMPTY;
        }else{
          return this.userService.getUsers().pipe(
            switchMap(users => of(
              UserActions.setUsers(users),
              UserActions.getUserFromStore(action.id)
            ))
          );
        }
      })
    )
  )

  getUserFromStore$ = createEffect(() => 
      this.actions$.pipe(
        ofType(UserActions.getUserFromStore),
        withLatestFrom(this.store.select(selectedUsers)),
        map(([action, usersFromStore]) => {
          const users = usersFromStore.filter(item => item._id == action.id)
          const user = users.length > 0 ? users[0] : {name: '', email: '', _id: ''}
          return UserActions.setUser(user);
        })
      )
  )

  deleteUser$ = createEffect(() => 
        this.actions$.pipe(
          ofType(UserActions.deleteUser),
          withLatestFrom(this.store.select(selectedUsers)),
          switchMap(([action, usersFromStore]) => {
            return this.userService.deleteUser(action.id)
            .pipe(switchMap(user => of(
              UserActions.setUsers(usersFromStore.filter(item => item._id != action.id))
            )))
          })
        )
  )

  addUser$ = createEffect(() => 
        this.actions$.pipe(
          ofType(UserActions.addUser),
          withLatestFrom(this.store.select(selectedUsers), this.store.select(selectedAuthUser)),
          switchMap(([action, usersFromStore, authData]) => {
            return this.userService.addUser(authData?.role == 'admin' ? {...action.user, role: 'user', createdBy: authData._id} : {...action.user, role: 'admin'} )
            .pipe(switchMap(user => of(
              UserActions.setUsers([...usersFromStore, user])
            )))
          })
        )
  )

  updateUser$ = createEffect(() => 
        this.actions$.pipe(
          ofType(UserActions.updateUser),
          withLatestFrom(this.store.select(selectedUsers)),
          switchMap(([action, usersFromStore]) => {
            return this.userService.updateUser(action.id,action.user)
            .pipe(switchMap(user => of(
              UserActions.setUsers(usersFromStore.map(item => item._id == action.id ? user : item))
            )))
          })
        )
  )

  constructor(
    private actions$: Actions,
    private store:Store,
    private userService:UserService 
  ) {}
}
