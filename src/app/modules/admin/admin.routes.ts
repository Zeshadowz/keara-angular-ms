import { Route } from "@angular/router";
import { HomeComponent } from "./home/home.component";

export const ADMIN_ROUTE: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    title: 'Home',
    data: {
      breadcrumb: 'Dashboard'
    },
    component: HomeComponent
  },
  {
    path: 'employee',
    title: 'Employees',
    loadChildren: () => import('./employee/admin-employee.routes').then(r => r.ADMIN_EMPLOYEE_ROUTE)
  }
]
