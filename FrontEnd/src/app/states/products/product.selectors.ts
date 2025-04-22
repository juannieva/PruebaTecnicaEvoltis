import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './product.reducer';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => state.products
);

export const selectLoading = createSelector(
  selectProductsState,
  (state: ProductsState) => state.loading
);

export const selectError = createSelector(
  selectProductsState,
  (state: ProductsState) => state.error
);
