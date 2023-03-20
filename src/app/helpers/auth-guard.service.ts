import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { selectedUserIsLogin } from '../auth/store/auth.selectors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store:Store, public router: Router) {}
  canActivate(): boolean {
    const isLogin = this.getValue(this.store.select(selectedUserIsLogin))
    //console.log('login state', isLogin);
    if(!isLogin){
        this.router.navigate(['/login']);
    }
    return isLogin ? true : false;;
  }

  getValue(obj: Observable<boolean>){
    let value: boolean = false;
    obj.subscribe((v:boolean) => value = v);
    return value;
  }
}