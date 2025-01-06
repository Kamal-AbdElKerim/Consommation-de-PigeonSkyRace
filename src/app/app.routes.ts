import { Routes } from '@angular/router';
import { authGuard } from "./guards/Auth/auth.guard";
import { afterAuthGuard } from "./guards/Auth/after-auth.guard";
import { roleAdminGuard } from "./guards/role/role-admin.guard";
import {ORGANIZERComponent} from "./component/organizer/organizer.component";
import {roleOrganizerGuard} from "./guards/role/role-organizer.guard";
import {UserComponent} from "./component/user/user.component";
import {roleUserGuard} from "./guards/role/role-user.guard";

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
    path: 'organizer/dashboard',
    loadComponent: () =>
      import('./component/organizer/organizer.component').then(m => m.ORGANIZERComponent),
    canActivate: [authGuard, roleOrganizerGuard]
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./component/user/user.component').then(m => m.UserComponent),
    canActivate: [authGuard, roleUserGuard]
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
