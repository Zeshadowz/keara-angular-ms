import { Route } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { EmployeesComponent } from "./employee/employees.component";

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
      breadcrumb: null
    },
    component: HomeComponent
  },
  {
    path: 'employee',
    title: 'Employees',
    data: {
      breadcrumb: 'Employees'
    },
    component: EmployeesComponent
  }
]
