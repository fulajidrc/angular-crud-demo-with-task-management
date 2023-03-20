import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskGroup } from 'src/app/admin/task/store/task-group.model';
import { changeTaskGroup, sortTaskAction } from 'src/app/admin/task/store/task.actions';
import { Task } from 'src/app/admin/task/store/task.model';
import { TaskService } from 'src/app/service';
import { sortTaskGroupAction } from '../../store/project.actions';
import { Project } from '../../store/project.model';

@Component({
  selector: 'app-task-group',
  templateUrl: './task-group.component.html',
  styleUrls: ['./task-group.component.scss']
})
export class TaskGroupComponent {
  @Input() project!: Project;

  @Input() set taskGroups(taskGroups: TaskGroup[]) {
    const tasks = taskGroups.map(taskgroup => {
      const tasks = taskgroup.tasks.map(task => ({ ...task }))
      return { ...taskgroup, tasks: tasks }
    })
    this.listTaskGroups = [...tasks]
    //console.log(this.listTaskGroups);
  }
  constructor(
    private store: Store,
    private taskService: TaskService
  ) { }
  listTaskGroups!: TaskGroup[];

  drop(event: CdkDragDrop<TaskGroup[]>) {
    //console.log(this.listTaskGroups);
    moveItemInArray(this.listTaskGroups, event.previousIndex, event.currentIndex);
    const taskGroups: TaskGroup[] = this.listTaskGroups.map((item, index) => {
      return { ...item, index: index };
    })
    this.store.dispatch(sortTaskGroupAction(taskGroups))
  }

  dropTask(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const taskGroupId = event.container.id
      const tasks: Task[] = event.container.data.map((item, index) => {
        return { ...item, index: index };
      })
      this.store.dispatch(sortTaskAction(tasks, taskGroupId))
    } else {
      const task = event.item.data
      const taskGroupId = event.container.id
      const previousGroupId = event.previousContainer.id
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const tasks: Task[] = event.container.data.map((item, index) => {
        return { ...item, index: index };
      })

      const tasks2: Task[] = event.previousContainer.data.map((item, index) => {
        return { ...item, index: index };
      })


      this.store.dispatch(changeTaskGroup(task, taskGroupId, previousGroupId, event.currentIndex, event.container.data, event.previousContainer.data, [...tasks, ...tasks2]));
    }
  }
}
