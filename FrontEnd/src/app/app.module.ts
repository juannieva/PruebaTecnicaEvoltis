import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// NgRx Store
import { StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Feature reducers
import { productReducer } from './states/products/product.reducer';
import { brandReducer } from './states/brands/brand.reducer';
import { categoryReducer } from './states/categories/category.reducer';

// NgRx-Forms
import { NgrxFormsModule } from 'ngrx-forms';

// Effects
import { ProductEffects } from './states/products/product.effects';
import { BrandEffects } from './states/brands/brand.effects';
import { CategoryEffects } from './states/categories/category.effects';
import { appInitialState, rootReducers } from './app.reducer';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// Compose root reducers
export interface AppState {
  products: ReturnType<typeof productReducer>;
  brands: ReturnType<typeof brandReducer>;
  categories: ReturnType<typeof categoryReducer>;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    // NgRx Store setup
    StoreModule.forRoot(rootReducers, {
      initialState: appInitialState
    }),
    EffectsModule.forRoot([
      ProductEffects,
      BrandEffects,
      CategoryEffects
    ]),
    NgrxFormsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
