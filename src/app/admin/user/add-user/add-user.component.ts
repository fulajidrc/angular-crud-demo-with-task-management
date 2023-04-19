import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../store/user.model';
import { Store } from '@ngrx/store';
import { CustomvalidationService } from 'src/app/service';
import { addUser, updateUser } from '../store/user.actions';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  addUserForm!: FormGroup;
  submitted = false

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private store:Store,
    private customValidator: CustomvalidationService
  ){
    this.createForm();
  }

  dTitle = 'Add User'
  dButtonText = 'Create'
  ngOnInit(){
    this.dTitle = this.data._id ? 'Update User' : 'Add User'
    this.dButtonText = this.data._id ? 'Update' : 'Create'
    if(this.data._id){
      this.updateForm();
    }
    this.addUserForm.patchValue(this.data);
  }


  createForm(){
    this.addUserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.customValidator.patternValidator()]],
      confirm_password: ['',[Validators.required]]
    },{
      validator: this.customValidator.MatchPassword('password', 'confirm_password'),
    });
  }

  updateForm(){
    this.addUserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get form() {
    return this.addUserForm.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submitted = true;
    if (this.addUserForm.valid) {
      //console.table(this.addUserForm.value);
      this.data._id 
      ? this.store.dispatch(updateUser(this.data._id,this.addUserForm.value))
      : this.store.dispatch(addUser(this.addUserForm.value))
      this.dialogRef.close();
    }
  }
}
