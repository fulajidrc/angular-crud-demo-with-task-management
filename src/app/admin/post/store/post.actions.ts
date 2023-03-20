import { createAction, props } from '@ngrx/store';
import { Post } from './post.model';

export const loadPosts = createAction(
  '[Post] Load Posts'
);

export const setPosts = createAction(
  'SET_POST',
  (posts: Post[]) => ({posts})
)

export const addPost = createAction(
  'ADD_POST', 
  (post:Post) => ({post})
)

export const storePost = createAction(
  'STORE_POST', 
  (post:Post) => ({post})
)


export const editPost = createAction(
  'EDIT_OPTION',
  (post:Post, id:string) => ({post, id})
)


export const deletePost = createAction(
  'DELETE_POST',
  (id:string) => ({id})
)


