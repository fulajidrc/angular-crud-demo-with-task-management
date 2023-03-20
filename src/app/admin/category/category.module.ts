import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { StoreModule } from '@ngrx/store';
import * as fromCategory from './store/category.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffects } from './store/category.effects';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { MatirialModule } from 'src/app/matirial.module';
import { AddCategoryComponent } from './add-category/add-category.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path:'',
    component: CategoryComponent
  }
]


@NgModule({
  declarations: [
    CategoryComponent,
    CategoryListComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    
    RouterModule.forChild(routes),
    MatirialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CategoryModule { }
