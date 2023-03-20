import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { getUser } from '../store/user.actions';
import { selectedUser } from '../store/user.selectors';
export interface DialogData {
  id: string;
}

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent {
  user$ = this.store.select(selectedUser)
  constructor(
    private store:Store,
    public dialogRef: MatDialogRef<ViewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ){
    console.log(this.data.id);
    this.store.dispatch(getUser(this.data.id));
  }
}
