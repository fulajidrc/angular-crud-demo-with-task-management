import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { loadUsers } from './store/user.actions';
import { selectedUsers } from './store/user.selectors';
import { ViewUserComponent } from './view-user/view-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  users$ = this.store.select(selectedUsers);
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ){}
  
  private routeSub!: Subscription;
  ngOnInit(){
    this.store.dispatch(loadUsers());
    this.routeSub = this.route.params.subscribe(params => {
     /// console.log(params);
      //console.log(params['id']);
      //router.navigate(['user', user.id, 'details']);
      if(params['id']){
        const dialogRef = this.dialog.open(ViewUserComponent, {
          data: {id: params['id']},
          width: '500px',
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          //this.animal = result;
          this.router.navigate(['user']);
        });
      }
   }); 
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
} 
