import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductRoutes } from './product-routing.module'
import {  SharedModule } from 'primeng/api';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ProductRoutes),
    SharedModule,
  ],
})
export class ProductModule { }
