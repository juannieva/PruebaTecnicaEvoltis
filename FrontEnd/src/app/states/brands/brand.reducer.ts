import { createReducer, on } from '@ngrx/store';
import * as BrandActions from './brand.actions';
import { BrandDto } from '../../interfaces/brand.model';

export interface BrandState {
  brands:   BrandDto[];
  loading:  boolean;
  error:    any;
}

export const initialBrandState: BrandState = {
  brands:  [],
  loading: false,
  error:   null
};

export const brandReducer = createReducer(
  initialBrandState,
  on(BrandActions.loadBrands,      state => ({ ...state, loading: true,  error: null })),
  on(BrandActions.loadBrandsSuccess, (state, { brands }) => ({ ...state, loading: false, brands })),
  on(BrandActions.loadBrandsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(BrandActions.createBrandSuccess, (state, { brand }) => ({
    ...state,
    brands: [...state.brands, brand]
  })),
  on(BrandActions.updateBrandSuccess, (state, { brand }) => ({
    ...state,
    brands: state.brands.map(b => b.id === brand.id ? brand : b)
  })),
  on(BrandActions.deleteBrandSuccess, (state, { id }) => ({
    ...state,
    brands: state.brands.filter(b => b.id !== id)
  }))
);
