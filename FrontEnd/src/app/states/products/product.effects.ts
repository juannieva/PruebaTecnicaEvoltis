import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import * as ProductFormActions from './product-form.actions';
import { ProductService } from 'src/app/services/product.service';
import { catchError, concatMap, map, mergeMap, of, tap } from 'rxjs';
import { ProductFilter } from 'src/app/interfaces/product.model';
import { MessageService } from 'primeng/api';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productService: ProductService,private messageService: MessageService) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(({ filter }: { filter?: ProductFilter }) =>
        this.productService.getProducts(filter).pipe(
          map(products => ProductActions.loadProductsSuccess({ products })),
          catchError(error => of(ProductActions.loadProductsFailure({ error })))
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProduct),
      mergeMap((action) =>
        this.productService.createProduct(action.product).pipe(
          map((product) => ProductActions.createProductSuccess({ product })),
          catchError((error) =>
            of(ProductActions.createProductFailure({ error }))
          )
        )
      )
    )
  );
  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      tap(() => this.showMessage('Producto editado correctamente', 'Éxito', 'success')),
      concatMap((action) =>
        this.productService.updateProduct(action.product).pipe(
          mergeMap(() => [
            ProductActions.loadProducts({ filter: undefined }) // ✅ Dispara la carga de productos nuevamente
            ,ProductFormActions.resetProductForm(),
            ProductFormActions.closeProductDialog()
          ]),
          catchError((error) =>
            of(ProductActions.updateProductFailure({ error }))
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap((action) =>
        this.productService.deleteProduct(action.id).pipe(
          map(() => ProductActions.deleteProductSuccess({ id: action.id })),
          catchError((error) => of(ProductActions.deleteProductFailure({ error })))
        )
      )
    )
  );


  createProductSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProductSuccess),
      tap(() => this.showMessage('Producto creado correctamente', 'Éxito', 'success')),
      concatMap(() => [
        ProductFormActions.resetProductForm(),
        ProductFormActions.closeProductDialog()
      ])
    )
  );
  createProductFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProductFailure),
      tap(({ error }) => this.showMessage('Error al crear el producto', 'Error', 'error')),
      map(() => ({ type: '[Product/API] Noop' })) // opcional
    )
  );

  private showMessage(detail: string, summary: string, severity: 'success' | 'error' | 'info' | 'warn'): void {
    this.messageService.add({
      severity,
      summary,
      detail
    });
  }
}
