import { Component } from '@angular/core';
import { EmployeeService } from "../../../shared/services/employee.service";
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

  constructor(private readonly employeeService: EmployeeService) {
    this.employeeService.getAll().subscribe(
      data => console.log(data),
    );
  }

}
