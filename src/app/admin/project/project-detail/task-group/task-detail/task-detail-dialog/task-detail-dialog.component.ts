import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Store } from '@ngrx/store';
import { updateTaskData } from 'src/app/admin/task/store/task.actions';
import { Task } from 'src/app/admin/task/store/task.model';

@Component({
  selector: 'app-task-detail-dialog',
  templateUrl: './task-detail-dialog.component.html',
  styleUrls: ['./task-detail-dialog.component.scss']
})
export class TaskDetailDialogComponent {
  @ViewChild('search') searchElement!: ElementRef;

  htmlContent=this.data.description
  activeTitleInput=false
  constructor(
    public dialogRef: MatDialogRef<TaskDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private store:Store
  ) {}

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

  closeDialog(){
    this.store.dispatch(updateTaskData(this.data._id ? this.data._id : ''  , {title: this.data.title, description: this.data.description, task_group: this.data.task_group}))    
    this.dialogRef.close();
  }
}
