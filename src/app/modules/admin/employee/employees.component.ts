import { Component } from '@angular/core';
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    EmployeeListComponent,
    RouterOutlet
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {

}
