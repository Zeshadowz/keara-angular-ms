import { Injectable } from '@angular/core';
import { EmployeeApi } from "../api/resources/employee-api";
import { map, Observable } from "rxjs";
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
      map(results =>
        results.map(employeeDto => this.employeeMapper.dtoToMain(employeeDto))
      ),
    );
  }

  save(employeeMain: EmployeeMain): Observable<string> {
    return this.employeeApi.save(this.employeeMapper.mainToDto(employeeMain))
      .pipe(map(employeeDto => employeeDto.id));
  }

  async remove(employee: EmployeeMain) {
    const result = await this.employeeApi.remove(this.employeeMapper.mainToDto(employee));
    return this.employeeMapper.dtoToMain(result);
  }
}
