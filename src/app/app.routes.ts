import { Routes } from '@angular/router';
import { AdminLayoutComponent } from "./theme/layout/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./theme/layout/auth-layout/auth-layout.component";
import { AppLayoutComponent } from "./theme/layout/app-layout/app-layout.component";

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  }, {
    path: 'admin',
    component: AdminLayoutComponent,
    children: []
  }, {
    path: 'app',
    component: AppLayoutComponent,
    children: []
  },
];
