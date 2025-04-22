import { BrandDto } from "./brand.model";
import { CategoryDto } from "./category.model";

export interface ProductDto {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  brandId: number | null;
  brand?: BrandDto;
  category?: CategoryDto;
  categoryId: number | null;
}



export interface ProductFilter {
  brandId?: number;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
