import { Action, createReducer, on } from '@ngrx/store';
import * as PostActions from './post.actions';
import { Post } from './post.model';

export const postFeatureKey = 'post';

export interface PostState {
  posts: Post[]
}

export const initialState: PostState = {
  posts: []
};

export const reducer = createReducer(
  initialState,

  on(PostActions.loadPosts, state => state),
  on(PostActions.setPosts, (state, {posts}) => ({
    ...state,
    posts: posts
  })),
  on(PostActions.storePost, (state, {post}) => ({
    ...state, 
    posts: [...state.posts, post]
  }))
);
