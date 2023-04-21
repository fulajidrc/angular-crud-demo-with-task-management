import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Store } from '@ngrx/store';
import { updateTaskData } from 'src/app/admin/task/store/task.actions';
import { Task } from 'src/app/admin/task/store/task.model';
import { TaskDetailDialogComponent } from '../task-detail-dialog.component';

@Component({
  selector: 'app-task-content',
  templateUrl: './task-content.component.html',
  styleUrls: ['./task-content.component.scss']
})
export class TaskContentComponent {
  ///@Input() task!:Task
  newTask!:Task;
  @Input() set task(task: Task) {
    this.htmlContent = task.description
    this.taskTitle = task.title
    this.newTask = {...task}
  }
  @ViewChild('search') searchElement!: ElementRef;
  htmlContent= '';
  taskTitle = '';
  activeTitleInput=false
  constructor(
    private store:Store,
    private router: Router,
    public dialogRef: MatDialogRef<TaskDetailDialogComponent>,
  ){

  }

  closeDialog(){
    const newTask:Task = {
      ...this.newTask,
      title : this.taskTitle,
      description: this.htmlContent,
    }
    console.log('closeDialog',newTask);
    this.store.dispatch(updateTaskData(this.newTask && this.newTask._id ? this.newTask._id : '', newTask))    
    this.dialogRef.close();
    this.router.navigate(['/project', this.newTask.project])
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '350px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: 'auto',
      translate: 'yes',
      enableToolbar: false,
      showToolbar: false,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    //uploadUrl: 'v1/image',
    //upload: (file: File) => { ... }
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};

  openTitleInput(){
    this.activeTitleInput = this.activeTitleInput ? false : true
    if(this.activeTitleInput){
      setTimeout(()=>{ // this will make the execution after the above boolean has changed
        this.searchElement.nativeElement.focus();
      },0); 
      
    }
  }
}
