import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Category } from '../admin/category/store/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl = environment.apiUrl
  constructor(
    private http:HttpClient
  ) { }

  getCategory():Observable<Category[]>{
    return this.http.get<{data: Category[]}>(`${this.apiUrl}/categories`, environment.apiOption)
    .pipe(map (response => response.data))
  }

  addCategory(category: Category):Observable<Category>{
    return this.http.post<{data: Category}>(`${this.apiUrl}/categories`, category, environment.apiOption)
    .pipe(map(response => response.data))
  }

  editCategory(category:Category, id:string):Observable<Category>{
    return this.http.patch<{data: Category}>(`${this.apiUrl}/categories/${id}`, category, environment.apiOption)
    .pipe(map (response => response.data))
  }

  deleteCategory(id: string): Observable<Category> { 
    return this.http.delete<{data:Category}>(`${this.apiUrl}/categories/${id}`, environment.apiOption)
    .pipe(map (response => response.data))
  }
}
