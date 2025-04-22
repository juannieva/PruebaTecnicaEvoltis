import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryState } from './category.reducer';

const selectCategoryState = createFeatureSelector<CategoryState>('categories');

export const selectAllCategories   = createSelector(selectCategoryState, s => s.categories);
export const selectCategoryLoading = createSelector(selectCategoryState, s => s.loading);
export const selectCategoryError   = createSelector(selectCategoryState, s => s.error);
