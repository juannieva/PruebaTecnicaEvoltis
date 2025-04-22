import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductDto, ProductFilter } from '../interfaces/product.model';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly baseUrl = `${environment.apiUrl}/Products`;

  constructor(private http: HttpClient) {}

  getProducts(filter?: ProductFilter): Observable<ProductDto[]> {
    let params = new HttpParams();
    if (filter) {
      if (filter.brandId    != null) params = params.set('brandId',    filter.brandId.toString());
      if (filter.categoryId != null) params = params.set('categoryId', filter.categoryId.toString());
      if (filter.minPrice   != null) params = params.set('minPrice',   filter.minPrice.toString());
      if (filter.maxPrice   != null) params = params.set('maxPrice',   filter.maxPrice.toString());
      if (filter.search != null && filter.search.trim() !== '') params = params.set('search',     filter.search);
    }
    console.log('Params:', params.toString());
    return this.http.get<ProductDto[]>(`${this.baseUrl}/GetAllProducts`, { params });
  }

  createProduct(product: ProductDto): Observable<ProductDto> {
    return this.http.post<ProductDto>(`${this.baseUrl}/AddProduct`, product);
  }

  updateProduct(product: ProductDto): Observable<ProductDto> {
    return this.http.put<ProductDto>(`${this.baseUrl}/UpdateProduct`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/DeleteProduct/${id}`);
  }
}
