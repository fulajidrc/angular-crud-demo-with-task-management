import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../helpers/auth-guard.service';
import { HeaderComponent } from './layout/header/header.component';
import { MatirialModule } from '../matirial.module';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffects } from './category/store/category.effects';
// import * as fromCategory from './store/category.reducer';
import * as fromCategory from './category/store/category.reducer'
import { ProjectEffects } from './project/store/project.effects';

import * as fromProject from './project/store/project.reducer';
import { TaskEffects } from './task/store/task.effects';
import * as fromTask from './task/store/task.reducer';
import { UserEffects } from './user/store/user.effects';
import * as fromUser from './user/store/user.reducer';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard] 
      },
      {
        path: 'user',
        loadChildren : () => import('./user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard] 
      },
      {
        path: 'category',
        loadChildren:() => import('./category/category.module').then(m => m.CategoryModule),
        canActivate: [AuthGuard] 
      },
      {
        path: 'post',
        loadChildren:() => import('./post/post.module').then(m => m.PostModule),
        canActivate: [AuthGuard] 
      },
      {
        path: 'task',
        loadChildren:() => import('./task/task.module').then(m => m.TaskModule),
        canActivate: [AuthGuard] 
      },
      {
        path: 'project',
        loadChildren:() => import('./project/project.module').then(m => m.ProjectModule),
        canActivate: [AuthGuard] 
      },
    ]
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatirialModule,
    FormsModule,
    FlexLayoutModule,
    StoreModule.forFeature(fromCategory.categoryFeatureKey, fromCategory.reducer),
    StoreModule.forFeature(fromProject.projectFeatureKey, fromProject.reducer),
    StoreModule.forFeature(fromTask.taskFeatureKey, fromTask.reducer),
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    EffectsModule.forFeature([CategoryEffects, ProjectEffects, TaskEffects, UserEffects]),

    
    // EffectsModule.forFeature([TaskEffects]),
  ],
  providers:[AuthGuard]
})
export class AdminModule { }
