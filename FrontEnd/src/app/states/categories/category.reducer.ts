import { createReducer, on } from '@ngrx/store';
import * as CategoryActions from './category.actions';
import { CategoryDto } from '../../interfaces/category.model';

export interface CategoryState {
  categories: CategoryDto[];
  loading:    boolean;
  error:      any;
}

export const initialCategoryState: CategoryState = {
  categories: [],
  loading:    false,
  error:      null
};

export const categoryReducer = createReducer(
  initialCategoryState,
  on(CategoryActions.loadCategories,      state => ({ ...state, loading: true, error: null })),
  on(CategoryActions.loadCategoriesSuccess, (state, { categories }) => ({ ...state, loading: false, categories })),
  on(CategoryActions.loadCategoriesFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(CategoryActions.createCategorySuccess, (state, { category }) => ({
    ...state,
    categories: [...state.categories, category]
  })),
  on(CategoryActions.updateCategorySuccess, (state, { category }) => ({
    ...state,
    categories: state.categories.map(c => c.id === category.id ? category : c)
  })),
  on(CategoryActions.deleteCategorySuccess, (state, { id }) => ({
    ...state,
    categories: state.categories.filter(c => c.id !== id)
  }))
);
