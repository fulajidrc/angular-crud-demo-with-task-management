import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map, switchAll, switchMap, withLatestFrom } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as TaskActions from './task.actions';
import { Store } from '@ngrx/store';
import { selectedActiveTask, selectedTaskGroups } from './task.selectors';
import { selectedTaskGroups as selectedProjectTaskGroup } from '../../project/store/project.selectors';
import { AssignUserService, TaskService } from 'src/app/service';
import { selectedActiveProject, selectedProject } from '../../project/store/project.selectors';
import {setSelectProject, setTaskGroups} from '../../project/store/project.actions'
import { setActiveTask } from './task.actions';
@Injectable()
export class TaskEffects {


  loadTasks$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(TaskActions.loadTasks),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });

  changeTaskIndex$ = createEffect(() => 
    this.actions$.pipe(
      ofType(TaskActions.changeIndexTask),
      withLatestFrom(this.store.select(selectedTaskGroups)),
      concatMap(([action, posts]) => {
     
        return EMPTY as Observable<{ type: string }>
      })
    )
  )

  addTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.addTask),
        withLatestFrom(this.store.select(selectedProjectTaskGroup)),
        switchMap(([action, taskGroups]) =>{
          return this.taskService.addTask(action.task)
          .pipe(switchMap(task => of(
            setTaskGroups(taskGroups.map(taskGroup => {
              if(taskGroup._id == action.task.task_group){
                return {...taskGroup, tasks: [...taskGroup.tasks, task]};
              }else{
                return taskGroup;
              }
            }))
          )))
        })
      )
  )

  changeTaskGroup$ = createEffect(() => 
        this.actions$.pipe(
          ofType(TaskActions.changeTaskGroup),
          withLatestFrom(this.store.select(selectedProjectTaskGroup)),
          switchMap(([action, taskGroups]) => {
            return this.taskService.changeTaskGroup(
              action.task._id ? action.task._id : '0', 
              action.groupId, 
              action.index, 
              action.previousGroupId,
              action.tasks
            )
            .pipe(switchMap(task => of(
              setTaskGroups(taskGroups
                .map(item => {
                  if(item._id == action.groupId){
                    const tasks = action.curruntTask
                    return {...item, tasks: tasks}
                  }else if(item._id == action.previousGroupId){
                    const tasks = action.previousTask
                    return {...item, tasks: tasks}
                  }else{
                    return item;
                  }
                })
              )
            )))
          })
        )
  )

  sortTaskAction$ = createEffect(() => 
          this.actions$.pipe(
            ofType(TaskActions.sortTaskAction),
            withLatestFrom(this.store.select(selectedProjectTaskGroup)),
            switchMap(([action, taskGroups]) => 
              this.taskService.sortTask(action.tasks)
              .pipe(map(task => setTaskGroups(taskGroups.map(item => item._id == action.groupId ?  {...item, tasks: action.tasks} : item))))
            )
          )
  )

  addTaskGroup$ = createEffect(() => 
        this.actions$.pipe(
          ofType(TaskActions.addTaskGroup),
          withLatestFrom(this.store.select(selectedProjectTaskGroup)),
          switchMap(([action, taskGroups]) => 
            this.taskService.addTaskGroup(action.taskGroup)
            .pipe(map(taskGroup => 
              setTaskGroups([...taskGroups, taskGroup])
            ))
          )
        )
  )

  updateTaskGroup$ = createEffect(() => 
      this.actions$.pipe(
        ofType(TaskActions.updateTaskGroup),
        withLatestFrom(this.store.select(selectedProjectTaskGroup)),
        switchMap(([action, taskGroups]) => 
          this.taskService.updateTaskGroup(action.id, action.taskGroup)
          .pipe(map(task_group => {
             return  setTaskGroups(taskGroups.map(item => {
                const itemData = item._id == action.id 
                ? {...item, title: task_group.title, description: task_group.description}
                : {...item}
                return itemData;
              }))
            }
          ))
        )
      )
  )

  deleteTaskGroup$ = createEffect(() => 
      this.actions$.pipe(
        ofType(TaskActions.deleteTaskGroup),
        withLatestFrom(this.store.select(selectedProjectTaskGroup)),
        switchMap(([action, taskGroups]) => 
          this.taskService.deleteTaskGroup(action.id)
          .pipe(map(task_group => {
             return setTaskGroups(taskGroups.filter(item => item._id != action.id))
            }
          ))
        )
      )
  )

  updateTaskData$ = createEffect(() => 
      this.actions$.pipe(
        ofType(TaskActions.updateTaskData),
        withLatestFrom(this.store.select(selectedProjectTaskGroup)),
        switchMap(([action, taskGroups]) => 
          this.taskService.updateTask(action.id, action.task)
          .pipe(map(task => {
            const taskGroupData = taskGroups.map(itemGroup => {
              if(itemGroup._id == action.task.task_group){
                const tasks = itemGroup.tasks.map(itemTask => {
                  if(itemTask._id == action.id){
                    const taskData = {...itemTask, title: task.title, description: task.description}
                    return {...taskData};
                  }else{
                    return {...itemTask};
                  }
                })
                const taskGroup = {...itemGroup, tasks: tasks}
                return {...taskGroup};
              }else{
                return {...itemGroup};
              }
             })
             return setTaskGroups(taskGroupData)
            }
          ))
        )
      )
  )
  
  assignTaskToUser$ = createEffect(() => 
      this.actions$.pipe(
        ofType(TaskActions.assignUserToTask),
        withLatestFrom(
          this.store.select(selectedProjectTaskGroup),
          this.store.select(selectedActiveTask)
        ),
        switchMap(([action, taskGroups, activeTask]) => 
          this.taskService.assignTask(action.assignUser)
          .pipe(switchMap(  assignUser => of(
            setTaskGroups(taskGroups.map(itemGroup => {
              const tasks = itemGroup.tasks.map(taskItem => {
                if(taskItem._id == assignUser.task){
                  return {...taskItem, assign_users: taskItem.assign_users 
                      ? [...taskItem.assign_users, assignUser]
                      : [assignUser]
                  }
                }else{
                  return taskItem;
                }
                
              })
              return {...itemGroup, tasks: tasks};
             })),
             setActiveTask({
              title: activeTask ? activeTask.title : '', 
              _id: activeTask ? activeTask._id : '',
              description: activeTask ? activeTask.description : '',
              assign_users: activeTask 
              ? activeTask.assign_users ? [...activeTask.assign_users, assignUser] : [assignUser]
               : [], 
               project: activeTask?.project,
                task_group: activeTask?.task_group,
                user: activeTask?.user,
                index: activeTask?.index 
             })
          )
          ))
        )
      )
  )

  unassignTaskToUser$ = createEffect(() => 
      this.actions$.pipe(
        ofType(TaskActions.unAssignUserToTask),
        withLatestFrom(
          this.store.select(selectedProjectTaskGroup),
          this.store.select(selectedActiveTask)
        ),
        switchMap(([action, taskGroups, activeTask]) => 
          this.taskService.unAssignTask(action.id)
          .pipe(switchMap(assignUser => 
            of(
              setTaskGroups(taskGroups.map(itemGroup => {
                const tasks = itemGroup.tasks.map(taskItem => {
                  const assignUsers = taskItem.assign_users?.filter(assignUserData => assignUserData._id != action.id)
                  return {...taskItem, assign_users: assignUsers}
                })
                return {...itemGroup, tasks: tasks};
              })),
              setActiveTask({
                title: activeTask ? activeTask.title : '', 
                _id: activeTask ? activeTask._id : '',
                description: activeTask ? activeTask.description : '',
                assign_users: activeTask 
                ? activeTask.assign_users ? [...activeTask.assign_users.filter(item => action.id != item._id)] : []
                : [], 
                project: activeTask?.project,
                task_group: activeTask?.task_group,
                user: activeTask?.user,
                index: activeTask?.index 
              })
            )
          ))
        )
      )
  )   
  
  getActiveTaskById$ = createEffect(() => 
      this.actions$.pipe(
        ofType(TaskActions.getActiveTaskById),
        withLatestFrom(
          this.store.select(selectedActiveTask)
        ),
        switchMap(([action,activeTask]) => {
          if(activeTask){
            return EMPTY;
          }else{
            return this.taskService.getTaskById(action.id)
              .pipe(switchMap(  task => of(
                setActiveTask(task)
              )
            ))
          }
        })
      )
  )

  constructor(
    private actions$: Actions,
    private store:Store,
    private taskService: TaskService,
    private assignUserService: AssignUserService
  ) {}
}
