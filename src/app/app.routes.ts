import { Routes } from '@angular/router';
import { authGuard } from "./guards/auth.guard";
import { afterAuthGuard } from "./guards/after-auth.guard";
import { roleAdminGuard } from "./guards/role-admin.guard";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./component/home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./component/form/form.component').then(m => m.FormComponent),
    canActivate: [afterAuthGuard]
  },
  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./component/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard, roleAdminGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadComponent: () =>
      import('./component/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
  }
];
