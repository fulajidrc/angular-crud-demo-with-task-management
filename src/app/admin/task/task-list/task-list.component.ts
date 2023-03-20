import { CdkDragDrop, CdkDragSortEvent, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskGroup } from '../store/task-group.model';
import { setTasks } from '../store/task.actions';
import { Task } from '../store/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @Input() set taskGroups(taskGroups: TaskGroup[]) {
    const tasks = taskGroups.map(taskgroup => {
      const tasks = taskgroup.tasks.map(task =>  ({...task}))
      return {...taskgroup, tasks: tasks}
    })
    this.listTaskGroups = [...tasks]
    console.log('changeed task group');
  }

  constructor(
    private store:Store
  ){
    // this.store
  }

 
  listTaskGroups:TaskGroup[] = []
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  dropTask(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.store.dispatch(setTasks(this.listTaskGroups))
  }
}
