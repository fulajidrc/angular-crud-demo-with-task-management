import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addCategory, editCategory } from '../store/category.actions';
import { Category } from '../store/category.model';

// export interface DialogData {
//   title: string;
//   description: string;
//   _id?: string;
// }

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  addCategoryForm!: FormGroup;
  submitted = false
  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private fb: FormBuilder,
    private store:Store
  ){
    this.createForm();
  }
  dTitle = 'Add Category'
  dButtonText = 'Create'
  ngOnInit(){
    this.dTitle = this.data._id ? 'Update Category' : 'Add Category'
    this.dButtonText = this.data._id ? 'Update' : 'Create'
    this.addCategoryForm.patchValue(this.data);
  }

  createForm(){
    this.addCategoryForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  get form() {
    return this.addCategoryForm.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submitted = true;
    if (this.addCategoryForm.valid) {
      this.data._id 
      ? this.store.dispatch(editCategory(this.addCategoryForm.value, this.data._id))
      : this.store.dispatch(addCategory(this.addCategoryForm.value ))
      this.dialogRef.close();
    }
  }

}
