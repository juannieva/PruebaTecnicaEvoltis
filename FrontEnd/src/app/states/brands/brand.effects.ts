import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BrandActions from './brand.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BrandService } from '../../services/brand.service';

@Injectable()
export class BrandEffects {
  constructor(
    private actions$: Actions,
    private brandService: BrandService
  ) {}
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrandActions.loadBrands),
      mergeMap(({ filter }) =>
        this.brandService.getBrands(filter).pipe(
          map(brands => BrandActions.loadBrandsSuccess({ brands })),
          catchError(err => of(BrandActions.loadBrandsFailure({ error: err })))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrandActions.createBrand),
      mergeMap(({ brand }) =>
        this.brandService.createBrand(brand).pipe(
          map(created => BrandActions.createBrandSuccess({ brand: created })),
          catchError(err => of(BrandActions.createBrandFailure({ error: err })))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrandActions.updateBrand),
      mergeMap(({ brand }) =>
        this.brandService.updateBrand(brand).pipe(
          map(() => BrandActions.updateBrandSuccess({ brand })),
          catchError(err => of(BrandActions.updateBrandFailure({ error: err })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrandActions.deleteBrand),
      mergeMap(({ id }) =>
        this.brandService.deleteBrand(id).pipe(
          map(() => BrandActions.deleteBrandSuccess({ id })),
          catchError(err => of(BrandActions.deleteBrandFailure({ error: err })))
        )
      )
    )
  );


}
