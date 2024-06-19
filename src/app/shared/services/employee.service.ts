import { Injectable } from '@angular/core';
import { EmployeeApi } from "../api/resources/employee-api";
import { map, Observable } from "rxjs";
import { EmployeeMapper } from "../mappers/employee.mapper";
import { EmployeeMain } from "../model/EmployeeMain.model";
import { EmployeeBusinessInfoApi } from "../api/resources/employee-business-info.api";
import { EmployeeInfo } from "../model/EmployeeInfo";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private employeeApi: EmployeeApi,
    private businessInfoApi: EmployeeBusinessInfoApi,
    private employeeMapper: EmployeeMapper) {
  }

  getAll() {
    return this.employeeApi.fetchAll().pipe(
      map(results =>
        results.map(employeeDto => this.employeeMapper.dtoToMain(employeeDto))
      ),
    );
  }

  fetchAllEmployeeInfos(): Observable<EmployeeInfo[]> {
    let infos: EmployeeInfo[] = [];

    this.employeeApi.fetchAll().subscribe(data => {
      for (const employeeInfo of this.employeeMapper.dtosToInfos(data)) {
        this.businessInfoApi.fetchById(employeeInfo.id).subscribe(businessInfo => {
          employeeInfo.identifier = businessInfo.idx;
          employeeInfo.email = businessInfo.email;
          employeeInfo.phone = businessInfo.phone;
          employeeInfo.designation = businessInfo.designation;
          employeeInfo.department = businessInfo.department;
          infos.push(employeeInfo);
        })
      }
    });

    return new Observable(source => source.next(infos));
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
