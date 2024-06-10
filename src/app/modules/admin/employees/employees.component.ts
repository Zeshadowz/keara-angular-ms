import { Component } from '@angular/core';
import { EmployeeListComponent } from "./employee-list/employee-list.component";

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    EmployeeListComponent
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {

}
