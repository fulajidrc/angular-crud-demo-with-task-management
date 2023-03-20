import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import * as PostActions from './post.actions';
import { Store } from '@ngrx/store';
import { PostService } from 'src/app/service';
import { selectedPosts } from './post.selectors';

@Injectable()
export class PostEffects {


  loadPosts$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(PostActions.loadPosts),
      withLatestFrom(this.store.select(selectedPosts)),
      switchMap(([action, posts]) => {
        if(posts.length > 0){
          return EMPTY;
        }  else { 
          return this.postService.getPosts()
          .pipe(map(
            posts => PostActions.setPosts(posts)
          ))
        }
      })
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      //concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });

  addPost$ = createEffect(() => 
    this.actions$.pipe(
      ofType(PostActions.addPost),
      map((action) => action.post),
      switchMap((post)=>
        this.postService.addPost(post)
        .pipe(map(post => PostActions.storePost(post)))
      )
    )
  )

  editPost$ = createEffect(() => 
      this.actions$.pipe(
        ofType(PostActions.editPost),
        withLatestFrom(this.store.select(selectedPosts)),
        switchMap(([action, posts]) =>
          this.postService.editPost(action.post, action.id)
          .pipe(map(post => 
            PostActions.setPosts(
              posts.map(item => 
                item._id == action.id ? {...post} : {...item}
            ))
          ))
        )
      )
  )

  deletePost = createEffect(() => 
    this.actions$.pipe(
      ofType(PostActions.deletePost),
      withLatestFrom(this.store.select(selectedPosts)),
      switchMap(([action, posts]) =>
        this.postService.deletePost(action.id)
        .pipe(map(post => PostActions.setPosts(
          posts.filter(item => item._id != action.id)
        )))
      )
    )
  )

  constructor(
    private actions$: Actions,
    private store:Store,
    private postService: PostService
  ) {}
}
