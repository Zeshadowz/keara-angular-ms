import { Injectable } from '@angular/core';
import { EmployeeApi } from "../api/resources/employee-api.";
import { map } from "rxjs";
import { EmployeeMapper } from "../mappers/employee.mapper";
import { EmployeeMain } from "../model/EmployeeMain.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private employeeApi: EmployeeApi,
              private employeeMapper: EmployeeMapper) {
  }

  getAll() {
    return this.employeeApi.fetchAll().pipe(
      map(data => data.map(employee => this.employeeMapper.dtoToMain(employee))),
    );
  }

  create(employee: EmployeeMain) {
    let employeeDto = this.employeeMapper.mainToDto(employee);
    employeeDto.password = 'secret'
    console.log('create', employeeDto);
  }
}
