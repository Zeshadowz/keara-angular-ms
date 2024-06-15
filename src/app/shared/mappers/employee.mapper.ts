import { Injectable } from "@angular/core";
import { EmployeeDto } from "../api/dto/EmployeeDto";
import { EmployeeMain } from "../model/EmployeeMain.model";

@Injectable({
  providedIn: "root",
})
export class EmployeeMapper {

  public dtoToMain(employee: EmployeeDto): EmployeeMain {
    return {
      id: employee.id,
      gender: employee.gender,
      title: employee.title,
      name: employee.firstname + " " + employee.lastname,
      firstname: employee.firstname,
      lastname: employee.lastname,
      email: employee.email,
      dateOfBirth: employee.dateOfBirth + '',
      phone: employee.phone,
      position: employee.position,
      active: employee.active,
    } as EmployeeMain;
  }

  public mainToDto(employee: EmployeeMain): EmployeeDto {
    return {
      id: 0,
      password: "",
      role: "",
      salary: 0,
      gender: employee.gender,
      title: employee.title,
      firstname: employee.firstname,
      lastname: employee.lastname,
      dateOfBirth: new Date(employee.dateOfBirth),
      email: employee.email,
      phone: employee.phone,
      position: employee.position,
      active: employee.active
    }
  }
}
