import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskGroup } from './store/task-group.model';
import { selectedTaskGroups } from './store/task.selectors';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
 taskGroups$ = this.store.select(selectedTaskGroups);
 taskGroups:TaskGroup[] = []
//  taskGroups:TaskGroup[] = [
//   {
//     title: 'to_do',
//     description: 'test',
//     tasks: [
//       {
//         title: 'to_do 1',
//         description: 'to_do 1 description'
//       },
//       {
//         title: 'to_do 2',
//         description: 'to_do 2 description'
//       },
//       {
//         title: 'to_do 3',
//         description: 'to_do 3 description'
//       },
//       {
//         title: 'to_do 4',
//         description: 'to_do 4 description'
//       }
//     ]
//   },
//   {
//     title: 'done',
//     description: 'test',
//     tasks: [
//       {
//         title: 'done 1',
//         description: 'done 1 description'
//       },
//       {
//         title: 'done 2',
//         description: 'done 2 description'
//       },
//       {
//         title: 'done 3',
//         description: 'done 3 description'
//       },
//       {
//         title: 'done 4',
//         description: 'done 4 description'
//       }
//     ]
//   }
// ]

  constructor(
    private store:Store
  ){
    // this.store.select(selectedTaskGroups).subscribe(taskGroups => {
      
    // })
  }
}
