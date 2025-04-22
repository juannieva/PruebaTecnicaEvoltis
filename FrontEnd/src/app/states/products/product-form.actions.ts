import { createAction, props } from "@ngrx/store";
import { ProductDto } from "src/app/interfaces/product.model";

// Limpiar el estado de los productos
export const patchProductForm = createAction(
  '[Product Form] Patch Form Value',
  props<{ product: ProductDto }>()
);
export const resetProductForm = createAction('[Product Form] Reset Product Form');

export const closeProductDialog = createAction('[Products] Close Dialog');
