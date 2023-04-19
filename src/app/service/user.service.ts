import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

import { User } from '../admin/user/store/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl
  constructor(
    private http:HttpClient
  ) { }

  getUsers():Observable<User[]>{
    return this.http.get<{data:User[]}>(`${this.apiUrl}/users`, environment.apiOption)
    .pipe(map(response => response.data));
  }

  deleteUser(id:string):Observable<User>{
    return this.http.delete<{data:User}>(`${this.apiUrl}/users/${id}`, environment.apiOption)
    .pipe(map(response => response.data))
  }

  addUser(user:User):Observable<User>{
    return this.http.post<{data:User}>(`${this.apiUrl}/users`,user, environment.apiOption)
    .pipe(map(response => response.data))
  }

  updateUser(id:string, user:User){
    return this.http.patch<{data:User}>(`${this.apiUrl}/users/${id}`,user, environment.apiOption)
    .pipe(map(response => response.data))
  }

}
