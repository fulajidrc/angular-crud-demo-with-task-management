import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCategorys } from './store/category.actions';
import { selectedCategories } from './store/category.selectors';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  categories$ = this.store.select(selectedCategories)
  constructor(
    private store:Store
  ){
    this.store.dispatch(loadCategorys())
  }
}
