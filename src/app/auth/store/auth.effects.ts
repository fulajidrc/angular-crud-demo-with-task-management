import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, withLatestFrom, switchMap, mergeMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { AuthService } from 'src/app/service';
import { User } from './auth.model';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {

  // loadAuths$ = createEffect(() => {
  //   return this.actions$.pipe( 

  //     ofType(AuthActions.loadAuths),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => AuthActions.loadAuthsSuccess({ data })),
  //         catchError(error => of(AuthActions.loadAuthsFailure({ error })))
  //         )
  //     )
  //   );
  // });

  loginAction = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginAction),
      map((action) => action.user),
      switchMap(user => this.authService.login(user)),
      mergeMap(user => of(
        AuthActions.setAuthUser(user),
        AuthActions.setLoginUser(true)
        )
      ),
      tap(() => this.router.navigate(['/dashboard']))
      // map((user: User) => {
      //   console.log(user);
      //   return AuthActions.setAuthUser(user)
      // }),
      //map(() => AuthActions.setLoginUser(true)),
      // switchMap((action) => this.authService.login(action.user).pipe(map(user => {
      //   return AuthActions.setAuthUser(user)
      // }))),
    )
  })

  logoutAction$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.logoutAction),
      switchMap( ()  => this.authService.logout()),
      mergeMap(() => of(
        AuthActions.setAuthUser({_id: '', name: '', email: '', role: ''}),
        AuthActions.setLoginUser(false)
      )),
      tap(() =>
        location.href = 'login'
        //this.router.navigate(['/login'])
      )
    )
  )


  constructor(
    private actions$: Actions,
    private authService:AuthService,
    private router: Router
  ) {}
}
