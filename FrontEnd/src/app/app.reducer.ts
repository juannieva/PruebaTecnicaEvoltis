import { FormGroupState } from 'ngrx-forms';
import { productFormReducer, productFormInitialState } from './states/products/product-form.reducer';
import { ProductDto, ProductFilter } from './interfaces/product.model';
import { ActionReducerMap } from '@ngrx/store';
import { productReducer, ProductsState } from './states/products/product.reducer';
import { brandReducer, BrandState } from './states/brands/brand.reducer';
import { categoryReducer, CategoryState } from './states/categories/category.reducer';
import { initialProductFilterState, productFilterFormReducer } from './states/products/product-list.reducer';

export interface AppState {
  products: ProductsState;
  brands: BrandState;
  categories: CategoryState;
  productForm: FormGroupState<ProductDto>;
  productFilterForm: FormGroupState<ProductFilter>;
}
export const appInitialState: Partial<AppState> = {
  productForm: productFormInitialState,
  productFilterForm: initialProductFilterState
};

export const rootReducers: ActionReducerMap<AppState> = {
  products: productReducer,
  brands: brandReducer,
  categories: categoryReducer,
  productForm: productFormReducer, // este es el de ngrx-forms
  productFilterForm: productFilterFormReducer
};
