import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AssignUser } from '../admin/task/store/assign_users.model';

@Injectable({
  providedIn: 'root'
})
export class AssignUserService {
  apiUrl = environment.apiUrl
  constructor(
    private http:HttpClient
  ) { }

  assignUser(category: AssignUser):Observable<AssignUser>{
    return this.http.post<{data: AssignUser}>(`${this.apiUrl}/assign-tasks`, category, environment.apiOption)
    .pipe(map(response => response.data))
  }

  deleteCategory(id: string): Observable<AssignUser> { 
    return this.http.delete<{data:AssignUser}>(`${this.apiUrl}/assign-tasks/${id}`, environment.apiOption)
    .pipe(map (response => response.data))
  }
}
