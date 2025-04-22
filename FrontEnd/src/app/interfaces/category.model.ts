import { ProductDto } from "./product.model";

export interface CategoryDto {
  id: number;
  name: string;
  parentCategoryId?: number;
  parentCategory?: CategoryDto;
  subcategories?: CategoryDto[];
  products?: ProductDto[];
}

export interface CategoryFilter {
  search?: string;
  parentId?: number;
}
