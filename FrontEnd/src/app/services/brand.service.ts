import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrandDto, BrandFilter } from '../interfaces/brand.model';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class BrandService {
  private baseUrl = `${environment.apiUrl}/Brands`;

  constructor(private http: HttpClient) {}

  getBrands(filter?: BrandFilter): Observable<BrandDto[]> {
    let params = new HttpParams();
    if (filter?.search != null && filter.search.trim() !== '') {
      params = params.set('search', filter.search);
    }
    return this.http.get<BrandDto[]>(`${this.baseUrl}/GetAllBrands`, { params });
  }
  createBrand(b: BrandDto)   { return this.http.post<BrandDto>(this.baseUrl, b); }
  updateBrand(b: BrandDto)   { return this.http.put<void>(`${this.baseUrl}/${b.id}`, b); }
  deleteBrand(id: number)    { return this.http.delete<void>(`${this.baseUrl}/${id}`); }
}
