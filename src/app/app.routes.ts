import { Routes } from '@angular/router';
import { MainLayoutComponent } from "./theme/layout/main-layout/main-layout.component";
import { AuthLayoutComponent } from "./theme/layout/auth-layout/auth-layout.component";

export const APP_ROUTE: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  }, {
    path: 'admin',
    component: MainLayoutComponent,
    loadChildren: () => import('./modules/admin/admin.routes').then(c => c.ADMIN_ROUTE)
  }
];
