import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { TaskGroup } from '../admin/task/store/task-group.model';
import { Task } from '../admin/task/store/task.model';
import { AssignUser } from '../admin/task/store/assign_users.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUrl = environment.apiUrl
  constructor(
    private http: HttpClient
  ) { }

  addTask(task: Task):Observable<Task>{
    return this.http.post<{data: Task}>(`${this.apiUrl}/tasks`, task, environment.apiOption)
    .pipe(map(response => response.data))
  }

  addTaskGroup(task: TaskGroup):Observable<TaskGroup>{
    return this.http.post<{data: TaskGroup}>(`${this.apiUrl}/tasks/groups`, task, environment.apiOption)
    .pipe(map(response => response.data))
  }

  updateTaskGroup(id:string, task: TaskGroup):Observable<TaskGroup>{
    return this.http.patch<{data: TaskGroup}>(`${this.apiUrl}/tasks/groups/${id}`, task, environment.apiOption)
    .pipe(map(response => response.data))
  }

  updateTask(id:string, task: Task):Observable<Task>{
    return this.http.patch<{data: Task}>(`${this.apiUrl}/tasks/${id}`, task, environment.apiOption)
    .pipe(map(response => response.data))
  }


  deleteTaskGroup(id:string):Observable<TaskGroup>{
    return this.http.delete<{data: TaskGroup}>(`${this.apiUrl}/tasks/groups/${id}`, environment.apiOption)
    .pipe(map(response => response.data))
  }

  changeTaskGroup(
    taskId:string, 
    groupId: string, 
    index:number, 
    previousGroupId: string,
    tasks: Task[]
  ){
    return this.http.post<{data: Task}>(`${this.apiUrl}/tasks/change-task-group`, {
      task: taskId, 
      task_group: groupId, 
      index:index, 
      previousGroupId: previousGroupId,
      tasks
    }, environment.apiOption)
    .pipe(map(response => response.data))
  }

  sortTask(tasks:Task[]){
    return this.http.post<{data: Task}>(`${this.apiUrl}/tasks/sort-task`,tasks, environment.apiOption)
    .pipe(map(response => response.data))
  }

  assignTask(assignTask:AssignUser){
    return this.http.post<{data:AssignUser}>(`${this.apiUrl}/assign-tasks`, assignTask, environment.apiOption)
    .pipe(map(response => response.data))
  }


  unAssignTask(id:string){
    return this.http.delete<{data:AssignUser}>(`${this.apiUrl}/assign-tasks/${id}`, environment.apiOption)
    .pipe(map(response => response.data))
  }

  getTaskById(id:string){
    return this.http.get<{data:Task}>(`${this.apiUrl}/tasks/${id}`, environment.apiOption)
    .pipe(map(response => response.data))
  }
}
