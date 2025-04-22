import { createFeatureSelector } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { ProductFilter } from 'src/app/interfaces/product.model';

export const selectProductFilterFormState =
  createFeatureSelector<FormGroupState<ProductFilter>>('productFilterForm');
