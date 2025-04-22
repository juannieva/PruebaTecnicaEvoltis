import { createFormGroupState, formGroupReducer, FormGroupState } from 'ngrx-forms';
import { ProductFilter } from 'src/app/interfaces/product.model';

export const PRODUCT_FILTER_FORM_ID = 'ProductFilterForm';

export const initialProductFilterState = createFormGroupState<ProductFilter>(
  PRODUCT_FILTER_FORM_ID,
  {
    search: '',
    brandId: undefined,
    categoryId: undefined,
    minPrice: 0,
    maxPrice: 1000000,
  }
);
export function productFilterFormReducer(
  state = initialProductFilterState,
  action: any
): FormGroupState<ProductFilter> {
  return formGroupReducer(state, action);
}
