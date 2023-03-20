import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { StoreModule } from '@ngrx/store';
import * as fromPost from './store/post.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './store/post.effects';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { MatirialModule } from 'src/app/matirial.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddPostComponent } from './add-post/add-post.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: PostComponent
  }
]

@NgModule({
  declarations: [
    PostComponent,
    PostListComponent,
    AddPostComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromPost.postFeatureKey, fromPost.reducer),
    EffectsModule.forFeature([PostEffects]),
    RouterModule.forChild(routes),
    MatirialModule,
    FlexLayoutModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PostModule { }
