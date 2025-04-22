import { createAction, props } from '@ngrx/store';
import { ProductDto, ProductFilter } from 'src/app/interfaces/product.model';


export const loadProducts= createAction(
  '[Product] Load Products',
  props<{ filter?: ProductFilter }>()
);
export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: ProductDto[] }>()
);
export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: any }>()
);

// Creación
export const createProduct = createAction(
  '[Products] Create Product',
  props<{ product: ProductDto }>()
);
export const createProductSuccess = createAction(
  '[Products] Create Product Success',
  props<{ product: ProductDto }>()
);
export const createProductFailure = createAction(
  '[Products] Create Product Failure',
  props<{ error: any }>()
);

// Edición
export const updateProduct = createAction(
  '[Products] Update Product',
  props<{ product: ProductDto }>()
);
export const updateProductSuccess = createAction(
  '[Products] Update Product Success',
  props<{ product: ProductDto }>()
);
export const updateProductFailure = createAction(
  '[Products] Update Product Failure',
  props<{ error: any }>()
);

// Baja
export const deleteProduct = createAction(
  '[Products] Delete Product',
  props<{ id: number }>()
);
export const deleteProductSuccess = createAction(
  '[Products] Delete Product Success',
  props<{ id: number }>()
);
export const deleteProductFailure = createAction(
  '[Products] Delete Product Failure',
  props<{ error: any }>()
);


