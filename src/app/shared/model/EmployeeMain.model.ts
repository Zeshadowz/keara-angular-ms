import { Gender } from "./Gender.enum";

export interface EmployeeMain {
  gender: Gender;
  title: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  position: string;
  salary: number;
  active: boolean;
}
