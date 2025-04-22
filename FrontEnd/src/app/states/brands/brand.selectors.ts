import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BrandState } from './brand.reducer';

const selectBrandState = createFeatureSelector<BrandState>('brands');

export const selectAllBrands  = createSelector(selectBrandState, s => s.brands);
export const selectBrandLoading = createSelector(selectBrandState, s => s.loading);
export const selectBrandError   = createSelector(selectBrandState, s => s.error);
