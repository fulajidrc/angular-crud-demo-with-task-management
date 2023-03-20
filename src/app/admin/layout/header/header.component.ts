import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { logoutAction } from 'src/app/auth/store/auth.actions';
import { selectedAuthUser } from 'src/app/auth/store/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() opened: boolean = false
  @Output() toogleSidebarEvent = new EventEmitter<boolean>();
  user$ = this.store.select(selectedAuthUser)
  constructor(
    private store:Store
  ){}
  
  toogleSidebar() {
    //this.opened = ;
   this.toogleSidebarEvent.emit(this.opened ? false : true);
  }

  logoutUser(){
    this.store.dispatch(logoutAction());
  }

}
