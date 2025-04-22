import { createAction, props } from '@ngrx/store';
import { BrandDto, BrandFilter } from 'src/app/interfaces/brand.model';

export const loadBrands         = createAction('[Brand] Load Brands',    props<{ filter?: BrandFilter }>());
export const loadBrandsSuccess  = createAction('[Brand] Load Success',   props<{ brands: BrandDto[] }>());
export const loadBrandsFailure  = createAction('[Brand] Load Failure',   props<{ error: any }>());

export const createBrand        = createAction('[Brand] Create',         props<{ brand: BrandDto }>());
export const createBrandSuccess = createAction('[Brand] Create Success', props<{ brand: BrandDto }>());
export const createBrandFailure = createAction('[Brand] Create Failure', props<{ error: any }>());

export const updateBrand        = createAction('[Brand] Update',         props<{ brand: BrandDto }>());
export const updateBrandSuccess = createAction('[Brand] Update Success', props<{ brand: BrandDto }>());
export const updateBrandFailure = createAction('[Brand] Update Failure', props<{ error: any }>());

export const deleteBrand        = createAction('[Brand] Delete',         props<{ id: number }>());
export const deleteBrandSuccess = createAction('[Brand] Delete Success', props<{ id: number }>());
export const deleteBrandFailure = createAction('[Brand] Delete Failure', props<{ error: any }>());
