import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { loadCategorys } from '../../category/store/category.actions';
import { selectedCategories } from '../../category/store/category.selectors';
import { addPost, editPost } from '../store/post.actions';
import { Post } from '../store/post.model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  addPostForm!: FormGroup;
  submitted = false
  categories$ = this.store.select(selectedCategories)
  constructor(
    public dialogRef: MatDialogRef<AddPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private fb: FormBuilder,
    private store:Store
  ){
    this.store.dispatch(loadCategorys())
    this.createForm();
  }
  
  dTitle = 'Add Post'
  dButtonText = 'Create'
  ngOnInit(){
    this.dTitle = this.data._id ? 'Update Post' : 'Add Post'
    this.dButtonText = this.data._id ? 'Update' : 'Create'
    this.addPostForm.patchValue(this.data);
  }

  createForm(){
    this.addPostForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  get form() {
    return this.addPostForm.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submitted = true;
    if (this.addPostForm.valid) {
      this.data._id 
      ? this.store.dispatch(editPost(this.addPostForm.value, this.data._id))
      : this.store.dispatch(addPost(this.addPostForm.value ))
      this.dialogRef.close();
    }
  }
}
