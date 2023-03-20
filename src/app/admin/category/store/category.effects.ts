import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Observable, EMPTY, pipe } from 'rxjs';
import * as CategoryActions from './category.actions';
import { Store } from '@ngrx/store';
import { selectedCategories } from './category.selectors';
import { CategoryService } from 'src/app/service';

@Injectable()
export class CategoryEffects {


  loadCategorys$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(CategoryActions.loadCategorys),
      withLatestFrom(this.store.select(selectedCategories)),
      switchMap(([action, categoriesFromStore]) => {
        if(categoriesFromStore.length){
          return EMPTY;
        }else{
          return this.categoryService.getCategory()
          .pipe(map(categories => CategoryActions.setCategories(categories)))
        }
      })
     // withLatestFrom()
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
     //concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });

  addCategory$ = createEffect(() => 
    this.actions$.pipe(
      ofType(CategoryActions.addCategory),
      map((action) => action.category),
      switchMap((category)=> 
        this.categoryService.addCategory(category)
        .pipe(map(category => CategoryActions.storeCategory(category)))
      )
    )
  )

  editCategory$ = createEffect(() => 
      this.actions$.pipe(
        ofType(CategoryActions.editCategory),
        withLatestFrom(this.store.select(selectedCategories)),
        switchMap(([action, categoriesFromStore]) => {
          return this.categoryService.editCategory(action.category, action.id)
          .pipe(map(category => 
            CategoryActions.setCategories(
              categoriesFromStore.map(item => {
                if(item._id == action.id){
                  return category;
                }else{
                  return {...item}
                }
              })
            )
          ))
        })
      )
  )

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.deleteCategory),
      withLatestFrom(this.store.select(selectedCategories)),
      switchMap(([action, categories]) => 
        this.categoryService.deleteCategory(action.id)
        .pipe(map(category => 
            CategoryActions.setCategories(
              categories.filter(item => item._id != action.id)
            )
        ))
      )
    )
  )

  constructor(
    private actions$: Actions,
    private store:Store,
    private categoryService: CategoryService
    ) {}
}
