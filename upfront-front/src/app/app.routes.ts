import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    canActivate: [loginGuard]
  },
  {
    path: 'auth/callback',
    loadComponent: () => import('./features/auth-callback/auth-callback.component').then(m => m.AuthCallbackComponent)
  },
  {
    path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [authGuard]
  },
  {
    path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
