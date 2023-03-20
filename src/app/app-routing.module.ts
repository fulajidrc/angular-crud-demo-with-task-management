import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth-guard.service';

const routes: Routes = [
  { 
    path: '',
    loadChildren : () => import('./auth/auth.module').then(m => m.AuthModule),
    //canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren : () => import('./admin/admin.module').then(m => m.AdminModule),
   // canActivate: [AuthGuard]
  },
  // {
  //   path: '',
  //   component: 
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
