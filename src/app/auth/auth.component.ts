import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from './store/auth.reducer';
import { selectedAuthUser, selectedUserIsLogin } from './store/auth.selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  user$ = this.store.select(selectedAuthUser);
  isLogin$ = this.store.select(selectedUserIsLogin);
  constructor(private store: Store){
    this.store.select(selectedAuthUser).subscribe(response => {
      console.log(response);
    })
  }

  ngOnInit(){
    
  }
}
