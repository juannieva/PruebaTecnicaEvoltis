import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { CategoryDto, CategoryFilter } from "../interfaces/category.model";

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private base = `${environment.apiUrl}/Categories`;

  constructor(private http: HttpClient) {}

  getCategories(filter?: CategoryFilter): Observable<CategoryDto[]> {
    let params = new HttpParams();
    if (filter?.search != null && filter.search.trim() !== '')    params = params.set('search', filter.search);
    if (filter?.parentId != null) params = params.set('parentId', filter.parentId.toString());
    return this.http.get<CategoryDto[]>(`${this.base}/GetAllCategories`, { params });
  }
  createCategory(c: CategoryDto) { return this.http.post<CategoryDto>(this.base, c); }
  updateCategory(c: CategoryDto) { return this.http.put<void>(`${this.base}/${c.id}`, c); }
  deleteCategory(id: number)     { return this.http.delete<void>(`${this.base}/${id}`); }
}
