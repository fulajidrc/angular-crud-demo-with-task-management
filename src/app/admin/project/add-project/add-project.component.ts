import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addProject, editProject } from '../store/project.actions';
import { Project } from '../store/project.model';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {
  addProjectForm!: FormGroup;
  submitted = false

  constructor(
    public dialogRef: MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project,
    private fb: FormBuilder,
    private store:Store
  ){
    this.createForm();
  }
  dTitle = 'Add Project'
  dButtonText = 'Create'

  ngOnInit(){
    this.dTitle = this.data._id ? 'Update Project' : 'Add Project'
    this.dButtonText = this.data._id ? 'Update' : 'Create'
    this.addProjectForm.patchValue(this.data);
  }

  createForm(){
    this.addProjectForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  get form() {
    return this.addProjectForm.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submitted = true;
    if (this.addProjectForm.valid) {
      this.data._id 
      ? this.store.dispatch(editProject(this.addProjectForm.value, this.data._id))
      : this.store.dispatch(addProject(this.addProjectForm.value ))
      this.dialogRef.close();
    }
  }
}
