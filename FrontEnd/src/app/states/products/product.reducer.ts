import { createReducer, on } from '@ngrx/store';
import { ProductDto } from 'src/app/interfaces/product.model';
import * as ProductActions from './product.actions';
export interface ProductsState {
  products: ProductDto[];
  loading: boolean;
  error: any;
}

export const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true
  })),
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products: products,
    error: null
  })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(ProductActions.createProductSuccess, (state, { product }) => ({
    ...state,
    products: [...state.products, product]
  })),

  on(ProductActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    products: state.products.map(p => p.id === product.id ? product : p)
  })),

  on(ProductActions.deleteProductSuccess, (state, { id }) => ({
    ...state,
    products: state.products.filter((p) => p.id !== id)
  })),

);
