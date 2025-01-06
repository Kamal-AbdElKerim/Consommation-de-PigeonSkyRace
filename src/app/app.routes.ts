import { Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {FormComponent} from "./component/form/form.component";
import {authGuard} from "./guards/auth.guard";
import {afterAuthGuard} from "./guards/after-auth.guard";

export const routes: Routes = [
  { path: 'home', component: HomeComponent , canActivate: [authGuard] },
  { path: 'login', component: FormComponent  , canActivate: [afterAuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
