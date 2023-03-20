import { createAction, props } from '@ngrx/store';
import { AssignUser } from './assign_users.model';
import { TaskGroup } from './task-group.model';
import { Task } from './task.model';

export const loadTasks = createAction(
  '[Task] Load Tasks'
);

export const setTasks = createAction(
  'SET_TASK',
  (taskGroups:TaskGroup[]) => ({taskGroups})
)

export const changeIndexTask = createAction(
  'CHANGE_INDEX_TASK',
  (task:Task, previousIndex:number,currentIndex:number)=> ({task,previousIndex,currentIndex })
)

export const addTask = createAction(
  'ADD_GROUP_TASK',
  (task: Task) => ({task})
)

export const changeTaskGroup = createAction(
  'CHANGE_TASK_GROUP',
  (
    task: Task, 
    groupId:string, 
    previousGroupId: string,
    index: number,
    curruntTask:Task[],
    previousTask: Task[],
    tasks:Task[]
  ) => ({task, groupId, previousGroupId, index, curruntTask, previousTask, tasks})
)

export const sortTaskAction = createAction(
  'SORT_TASK_ACTION',
  (tasks: Task[], groupId: string) => ({tasks, groupId})
)

export const addTaskGroup = createAction(
  'ADD_TASK_GROUP_ACTION',
  (taskGroup: TaskGroup) => ({taskGroup})
)

export const updateTaskGroup = createAction(
  'UPDATE_TASK_GROUP_ACTION',
  (id:string, taskGroup: TaskGroup) => ({id, taskGroup})
)

export const deleteTaskGroup = createAction(
  'DELETE_TASK_GROUP',
  (id:string) => ({id})
)

export const updateTaskData = createAction(
  'UPDATE_TASK_DATA',
  (id:string, task:Task) => ({id, task})
)

export const assignUserToTask = createAction(
  'ASSIGN_USER_TO_TASK',
  (assignUser:AssignUser) => ({assignUser})
)




