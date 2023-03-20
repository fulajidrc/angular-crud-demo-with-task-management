import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { logoutAction, setAuthUser, setLoginUser } from '../auth/store/auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

    constructor(
        private _snackBar: MatSnackBar, 
        private store:Store,
        private router:Router
    ) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.log('status code',error.status);
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                        console.log('This is client side error');
                        errorMsg = `Error: ${error.error.message}`;
                    } else {
                        if(error.status == 401){
                            //this.store.dispatch(logoutAction())
                            this.store.dispatch(setAuthUser({name: '', email: '', _id:''}));
                            this.store.dispatch(setLoginUser(false));
                            this.router.navigate(['/login'])
                        }
                        if(error.status == 400 || error.status == 500 || error.status == 401 || error.status == 403){
                            console.log('error', error.error.message);
                            this._snackBar.open(error.error.message, '', {
                                panelClass: 'alert-danger',
                                duration: 5000,
                            });
                        }
                        console.log('This is server side error');
                        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                    }
                    console.log(errorMsg);
                    return throwError(errorMsg);
                })
            )
    }
}