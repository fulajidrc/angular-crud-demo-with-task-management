import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadPosts } from './store/post.actions';
import { selectedPosts } from './store/post.selectors';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  posts$ = this.store.select(selectedPosts)
  constructor(
    private store:Store
  ){
    this.store.dispatch(loadPosts())
  }


}
