import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Project } from '../admin/project/store/project.model';
import { TaskGroup } from '../admin/task/store/task-group.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apiUrl = environment.apiUrl
  constructor(
    private http:HttpClient
  ) { }
  

  getProject():Observable<Project[]>{
    return this.http.get<{data: Project[]}>(`${this.apiUrl}/projects`, environment.apiOption)
    .pipe(map (response => response.data))
  }

  addProject(category: Project):Observable<Project>{
    return this.http.post<{data: Project}>(`${this.apiUrl}/projects`, category, environment.apiOption)
    .pipe(map(response => response.data))
  }

  editProject(category:Project, id:string):Observable<Project>{
    return this.http.patch<{data: Project}>(`${this.apiUrl}/projects/${id}`, category, environment.apiOption)
    .pipe(map (response => response.data))
  }

  deleteProject(id: string): Observable<Project> { 
    return this.http.delete<{data:Project}>(`${this.apiUrl}/projects/${id}`, environment.apiOption)
    .pipe(map (response => response.data))
  }

  sortTaskGroup(taskGroups: TaskGroup[]):Observable<any>{
    return this.http.post<{data:Project}>(`${this.apiUrl}/projects/sort-task-group`, taskGroups, environment.apiOption)
    .pipe(map (response => response.data))
  }

}
