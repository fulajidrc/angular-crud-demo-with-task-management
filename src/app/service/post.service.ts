import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Post } from '../admin/post/store/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiUrl = environment.apiUrl
  constructor(
    private http:HttpClient
  ) { }


  getPosts():Observable<Post[]>{
    return this.http.get<{data: Post[]}>(`${this.apiUrl}/posts`, environment.apiOption)
    .pipe(map (response => response.data))
  }

  addPost(post: Post):Observable<Post>{
    return this.http.post<{data: Post}>(`${this.apiUrl}/posts`, post, environment.apiOption)
    .pipe(map(response => response.data))
  }

  editPost(post:Post, id:string):Observable<Post>{
    return this.http.patch<{data: Post}>(`${this.apiUrl}/posts/${id}`, post, environment.apiOption)
    .pipe(map (response => response.data))
  }

  deletePost(id: string): Observable<Post> { 
    return this.http.delete<{data:Post}>(`${this.apiUrl}/posts/${id}`, environment.apiOption)
    .pipe(map (response => response.data))
  }
}
