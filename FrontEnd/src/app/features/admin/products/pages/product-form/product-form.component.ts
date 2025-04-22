import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import {
  markAsTouched,
  NgrxFormsModule,
} from 'ngrx-forms';
import { Actions, ofType } from '@ngrx/effects';
import { ProductDto } from 'src/app/interfaces/product.model';
import { Store } from '@ngrx/store';
import * as ProductFormActions from 'src/app/states/products/product-form.actions';
import * as ProductActions from 'src/app/states/products/product.actions';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { Observable, firstValueFrom } from 'rxjs';
import { BrandDto } from 'src/app/interfaces/brand.model';
import { CategoryDto } from 'src/app/interfaces/category.model';
import { selectAllBrands } from 'src/app/states/brands/brand.selectors';
import { selectAllCategories } from 'src/app/states/categories/category.selectors';
import * as BrandActions from 'src/app/states/brands/brand.actions';
import * as CategoryActions from 'src/app/states/categories/category.actions';
import { ReactiveFormsModule } from '@angular/forms';
import { selectProductFormState } from 'src/app/states/products/product-from.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { inject, DestroyRef } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgrxFormsModule,
    InputTextareaModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    DropdownModule
  ],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() product: ProductDto | null = null;
  @Output() closeDialog = new EventEmitter<void>();
  brands$: Observable<BrandDto[]> = this.store.select(selectAllBrands);
  categories$: Observable<CategoryDto[]> = this.store.select(selectAllCategories);
  formState$ = this.store.select(selectProductFormState);

  constructor(private store: Store,
              private actions$: Actions,
  ) {}
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.store.dispatch(BrandActions.loadBrands({}));
    this.store.dispatch(CategoryActions.loadCategories({}));
    if (this.product) {
      this.store.dispatch(
        ProductFormActions.patchProductForm({ product: this.product })
      );
    }
    this.actions$
    .pipe(
      ofType(ProductFormActions.closeProductDialog),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(() => {
      this.closeDialog.emit();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product']) {
      if (this.product) {
        // Edición: parcheá el form con los datos existentes
        this.store.dispatch(ProductFormActions.patchProductForm({ product: this.product }));
      } else {
        // Creación: reseteá el form para que esté vacío
        this.store.dispatch(ProductFormActions.resetProductForm());
      }
    }
  }

  async onSubmit() {
    const formState = await firstValueFrom(this.formState$);

    if (!formState.isValid) {

      console.warn('Formulario inválido. Abortando submit.');
      return;
    }

    const product = formState.value;

    if (product.id) {
      this.store.dispatch(ProductActions.updateProduct({ product }));
    } else {
      this.store.dispatch(ProductActions.createProduct({ product }));
    }
  }

  onCancel() {
    this.store.dispatch(ProductFormActions.resetProductForm());
    this.closeDialog.emit();
  }
}
