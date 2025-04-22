import { createFeatureSelector } from "@ngrx/store";
import { FormGroupState } from "ngrx-forms";
import { ProductDto } from "src/app/interfaces/product.model";

export const selectProductFormState = createFeatureSelector<FormGroupState<ProductDto>>('productForm');
