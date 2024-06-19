import { Gender } from "./Gender.enum";

export interface EmployeeMain {
  id: string
  gender: Gender;
  title: string;
  firstname: string;
  lastname: string;
  middleName: string;
  dateOfBirth: string;
  maritalStatus: string;
  aboutMe: string;
  email: string;
  phone: string;
  active: boolean;
}
