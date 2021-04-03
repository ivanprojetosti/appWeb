import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'symptoms-list',
    loadChildren: () => import('./symptoms/symptoms-list/symptoms-list.module').then( m => m.SymptomsListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'symptoms-form/new',
    loadChildren: () => import('./symptoms/symptoms-form/symptoms-form.module').then( m => m.SymptomsFormPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'symptoms-form/edit/:id',
    loadChildren: () => import('./symptoms/symptoms-form/symptoms-form.module').then( m => m.SymptomsFormPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
