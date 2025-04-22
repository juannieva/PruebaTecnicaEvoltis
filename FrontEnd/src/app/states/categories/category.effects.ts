import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CategoryActions from './category.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CategoryService } from '../../services/category.service';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.loadCategories),
      mergeMap(({ filter }) =>
        this.categoryService.getCategories(filter).pipe(
          map((cats) =>
            CategoryActions.loadCategoriesSuccess({ categories: cats })
          ),
          catchError((err) =>
            of(CategoryActions.loadCategoriesFailure({ error: err }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.createCategory),
      mergeMap(({ category }) =>
        this.categoryService.createCategory(category).pipe(
          map((created) =>
            CategoryActions.createCategorySuccess({ category: created })
          ),
          catchError((err) =>
            of(CategoryActions.createCategoryFailure({ error: err }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.updateCategory),
      mergeMap(({ category }) =>
        this.categoryService.updateCategory(category).pipe(
          map(() => CategoryActions.updateCategorySuccess({ category })),
          catchError((err) =>
            of(CategoryActions.updateCategoryFailure({ error: err }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.deleteCategory),
      mergeMap(({ id }) =>
        this.categoryService.deleteCategory(id).pipe(
          map(() => CategoryActions.deleteCategorySuccess({ id })),
          catchError((err) =>
            of(CategoryActions.deleteCategoryFailure({ error: err }))
          )
        )
      )
    )
  );


}
