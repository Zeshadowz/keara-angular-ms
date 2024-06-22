import { Injectable } from "@angular/core";
import { EmployeeDto } from "../api/dto/EmployeeDto";
import { EmployeeMain } from "../model/EmployeeMain.model";
import { EmployeeInfo } from "../model/EmployeeInfo";

@Injectable({
  providedIn: "root",
})
export class EmployeeMapper {

  public dtoToMain(employee: EmployeeDto): EmployeeMain {
    return {
      // id: employee.id,
      // gender: employee.gender,
      // title: employee.title,
      // name: employee.firstname + " " + employee.lastname,
      // firstname: employee.firstname,
      // lastname: employee.lastname,
      // email: employee.email,
      // dateOfBirth: employee.dateOfBirth + '',
      // phone: employee.phone,
      // position: employee.position,
      // salary: employee.salary,
      // active: employee.active,
    } as EmployeeMain;
  }

  public dtoToInfo(employee: EmployeeDto): EmployeeInfo {
    return {
      id: employee.id,
      identifier: '',
      name: employee.gender + ' ' + employee.title + ' ' + employee.firstname + ' ' + employee.lastname,
      middleName: employee.middle_name,
      phone: "",
      email: "",
      department: ""
    } as EmployeeInfo;
  }

  public dtosToInfos(employees: EmployeeDto[]): EmployeeInfo[] {
    let infos: EmployeeInfo[] = [];
    for (const employee of employees) {
      infos.push(this.dtoToInfo(employee));
    }
    return infos;
  }


  public mainToDto(employee: EmployeeMain): EmployeeDto {
    return {
      id: employee.id,
      gender: employee.gender.valueOf(),
      title: employee.title,
      firstname: employee.firstname,
      lastname: employee.lastname,
      middle_name: employee.middleName,
      dateOfBirth: employee.dateOfBirth,
      marital_status: employee.maritalStatus,
      about_me: employee.aboutMe,
      email: employee.email,
      phone: employee.phone,
      active: employee.active
    }
  }
}
