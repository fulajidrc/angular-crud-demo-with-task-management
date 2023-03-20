import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TaskGroup } from 'src/app/admin/task/store/task-group.model';
import { addTaskGroup, updateTaskGroup } from 'src/app/admin/task/store/task.actions';

@Component({
  selector: 'app-task-group-dialog',
  templateUrl: './task-group-dialog.component.html',
  styleUrls: ['./task-group-dialog.component.scss']
})
export class TaskGroupDialogComponent {
  addTaskForm!: FormGroup;
  submitted = false

  constructor(
    public dialogRef: MatDialogRef<TaskGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskGroup,
    private fb: FormBuilder,
    private store:Store
  ){
    this.createForm();
  }

  dTitle = 'Add List'
  dButtonText = 'Create'

  ngOnInit(){
    this.dTitle = this.data._id ? 'Update List' : 'Add List'
    this.dButtonText = this.data._id ? 'Update' : 'Create'
    this.addTaskForm.patchValue(this.data);
  }

  createForm(){
    this.addTaskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  get form() {
    return this.addTaskForm.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submitted = true;
    if (this.addTaskForm.valid) {
      const taskGroup:TaskGroup = this.data._id 
      ? this.addTaskForm.value 
      : {
        ...this.addTaskForm.value, 
        project: this.data.project, 
        index: this.data.index
      }
      //console.log('add task', taskGroup);
      this.data._id 
      ? this.store.dispatch(updateTaskGroup(this.data._id, this.addTaskForm.value))
      : this.store.dispatch(addTaskGroup(taskGroup))
      this.dialogRef.close();
    }
  }
}
