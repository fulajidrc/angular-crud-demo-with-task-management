import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Auth, User } from '../auth/store/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl
  constructor(
    private http:HttpClient
  ) { }

  login(auth: Auth):Observable<User>{
    return this.http.post<{data: User}>(`${this.apiUrl}/auth/login`, auth, environment.apiOption).pipe(map(response => response.data))
  }

  logout():Observable<string>{
    return this.http.get(`${this.apiUrl}/auth/logout`, environment.apiOption).pipe(map(response => 'logout'))
  }
}
