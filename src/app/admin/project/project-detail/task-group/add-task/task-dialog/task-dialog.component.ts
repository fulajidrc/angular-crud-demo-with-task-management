import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addTask } from 'src/app/admin/task/store/task.actions';
import { Task } from 'src/app/admin/task/store/task.model';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent {
  addTaskForm!: FormGroup;
  submitted = false
  
  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private fb: FormBuilder,
    private store:Store
  ){
    this.createForm();
  }

  dTitle = 'Add Task'
  dButtonText = 'Create'

  ngOnInit(){
    this.dTitle = this.data._id ? 'Update Task' : 'Add Task'
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
      const task:Task = this.data._id ? this.addTaskForm.value : {
        ...this.addTaskForm.value, 
        project: this.data.project, 
        task_group: this.data.task_group,
        index: this.data.index
      }
      console.log('add task', task);
      this.data._id 
      ? ''//this.store.dispatch(editProject(this.addProjectForm.value, this.data._id))
      : this.store.dispatch(addTask(task))
      this.dialogRef.close();
    }
  }
}
