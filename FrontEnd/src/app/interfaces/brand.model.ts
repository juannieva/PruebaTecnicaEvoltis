import { ProductDto } from "./product.model";

export interface BrandDto {
  id: number;
  name: string;
  products?: ProductDto[];
}

export interface BrandFilter {
  search?: string;
}
