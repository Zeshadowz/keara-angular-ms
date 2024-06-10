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
      phone: employee.phone,
      position: employee.position,
      active: employee.active,
    } as EmployeeMain;
  }
}
