import { createAction, props } from '@ngrx/store';
import { CategoryDto, CategoryFilter } from '../../interfaces/category.model';

export const loadCategories         = createAction('[Category] Load',    props<{ filter?: CategoryFilter }>());
export const loadCategoriesSuccess  = createAction('[Category] Load Success', props<{ categories: CategoryDto[] }>());
export const loadCategoriesFailure  = createAction('[Category] Load Failure', props<{ error: any }>());

export const createCategory         = createAction('[Category] Create',       props<{ category: CategoryDto }>());
export const createCategorySuccess  = createAction('[Category] Create Success', props<{ category: CategoryDto }>());
export const createCategoryFailure  = createAction('[Category] Create Failure', props<{ error: any }>());

export const updateCategory         = createAction('[Category] Update',       props<{ category: CategoryDto }>());
export const updateCategorySuccess  = createAction('[Category] Update Success', props<{ category: CategoryDto }>());
export const updateCategoryFailure  = createAction('[Category] Update Failure', props<{ error: any }>());

export const deleteCategory         = createAction('[Category] Delete',       props<{ id: number }>());
export const deleteCategorySuccess  = createAction('[Category] Delete Success', props<{ id: number }>());
export const deleteCategoryFailure  = createAction('[Category] Delete Failure', props<{ error: any }>());
