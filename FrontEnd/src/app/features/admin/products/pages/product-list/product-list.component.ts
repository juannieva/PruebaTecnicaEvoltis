import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductDto, ProductFilter } from 'src/app/interfaces/product.model';
import * as ProductActions from 'src/app/states/products/product.actions';
import { selectAllProducts, selectLoading } from 'src/app/states/products/product.selectors';
import { debounceTime, distinctUntilChanged, filter, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProductFormComponent } from '../product-form/product-form.component';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { BrandDto } from 'src/app/interfaces/brand.model';
import { CategoryDto } from 'src/app/interfaces/category.model';
import { selectAllBrands } from 'src/app/states/brands/brand.selectors';
import * as BrandActions from 'src/app/states/brands/brand.actions';
import * as CategoryActions from 'src/app/states/categories/category.actions';
import { selectAllCategories } from 'src/app/states/categories/category.selectors';
import { selectProductFilterFormState } from 'src/app/states/products/product-list.selectors';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [ProductFormComponent,
      CommonModule,
      ButtonModule,
      DialogModule,
    TableModule,
    NgrxFormsModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule
  ],
})
export class ProductListComponent implements OnInit {
  products$: Observable<ProductDto[]>;
  loading$: Observable<boolean>;
  brands$: Observable<BrandDto[]> = this.store.select(selectAllBrands);
  categories$: Observable<CategoryDto[]> = this.store.select(selectAllCategories);
  filterForm$ = this.store.select(selectProductFilterFormState);
  displayDialog = false;

  selectedProduct: ProductDto | null = null;

  constructor(private store: Store) {
    this.products$ = this.store.select(selectAllProducts);
    this.loading$ = this.store.select(selectLoading);
    this.filterForm$ = this.store.select(selectProductFilterFormState);
  }

  ngOnInit(): void {
    this.store.dispatch(BrandActions.loadBrands({}));
    this.store.dispatch(CategoryActions.loadCategories({}));
    this.store.select(selectAllProducts);
    this.filterForm$
    .pipe(
      filter((formState): formState is FormGroupState<ProductFilter> => !!formState),
      debounceTime(500),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev.value) === JSON.stringify(curr.value))
    )
    .subscribe((formState) => {
      this.store.dispatch(ProductActions.loadProducts({ filter: formState.value }));
    });
  }

  onApplyFilters(form: FormGroupState<ProductFilter>) {
    if (!form.isValid) return;

    const filter: ProductFilter = {
      ...form.value,
    };

    this.store.dispatch(ProductActions.loadProducts({ filter }));
  }
  onCreate() {
    this.selectedProduct = null;
    this.displayDialog = true;
  }

  onEdit(product: ProductDto) {
    this.selectedProduct = product;
    this.displayDialog = true;
  }

  onDelete(product: ProductDto) {
    if (confirm('¿Seguro que querés eliminar este producto?')) {
      this.store.dispatch(ProductActions.deleteProduct({ id: product.id }));
    }
  }

  onDialogClose() {
    this.displayDialog = false;
  }
}
