import { createFormGroupState, formGroupReducer, FormGroupState, reset, setValue, updateGroup, validate } from 'ngrx-forms';
import { ProductDto } from '../../interfaces/product.model';
import { greaterThanOrEqualTo, required } from 'ngrx-forms/validation';
import * as ProductFormActions from './product-form.actions';
import { Action } from '@ngrx/store';

export const PRODUCT_FORM_ID = 'productForm';

const initialFormState = createFormGroupState<ProductDto>(PRODUCT_FORM_ID, {
  id: 0,
  name: '',
  description: '',
  price: 0,
  stock: 0,
  categoryId: null,
  brandId: null,
  imageUrl: ''
});

export function productFormReducer(
  state: FormGroupState<ProductDto> = initialFormState,
  action: Action
): FormGroupState<ProductDto> {
  // 3) Primero dejamos que ngrx-forms maneje el action
  let newState = formGroupReducer(state, action);

  // 4) Si viene de patchProductForm, parcheamos todo el valor
  if (action.type === ProductFormActions.patchProductForm.type) {
    const { product } = (action as ReturnType<typeof ProductFormActions.patchProductForm>);
    newState = setValue(newState, product);
  }

  // 5) Si viene de resetProductForm, reseteamos a valor inicial
  if (action.type === ProductFormActions.resetProductForm.type) {
    newState = reset(initialFormState);
  }

  newState = updateGroup<ProductDto>(newState, {
    name: validate(required),
    price: validate(required, greaterThanOrEqualTo(0)),
    stock: validate(required, greaterThanOrEqualTo(0)),
    brandId: validate(required),
    categoryId: validate(required),
  });

  return newState;
}

export const productFormInitialState = initialFormState;
