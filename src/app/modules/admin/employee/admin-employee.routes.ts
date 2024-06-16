import { Routes } from "@angular/router";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { EmployeesComponent } from "./employees.component";

export const ADMIN_EMPLOYEE_ROUTE: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    children: [
      {
        path: '',
        data: {
          breadcrumb: 'Employees'
        },
        component: EmployeeListComponent
      }, {
        path: 'add',
        data: {
          breadcrumb: 'Employee > Add New Record'
        },
        component: AddEmployeeComponent
      }
    ]
  },

]
