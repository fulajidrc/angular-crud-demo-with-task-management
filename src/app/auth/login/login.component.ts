import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginAction } from '../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  registerForm!: FormGroup;
  submitted = false
  constructor(
    private fb: FormBuilder,
    private store:Store
  ){
    this.createForm();
  }
  
  ngOnInit(){

  }

  createForm(){
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get form() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      // alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      // console.table(this.registerForm.value);
      this.store.dispatch(loginAction(this.registerForm.value))
    }
  }
}
