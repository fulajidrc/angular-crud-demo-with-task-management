import { Component, Input, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Task } from 'src/app/admin/task/store/task.model';

@Component({
  selector: 'app-task-data',
  templateUrl: './task-data.component.html',
  styleUrls: ['./task-data.component.scss']
})
export class TaskDataComponent {
  @Input() task!:Task
}
