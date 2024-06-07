import { Injectable } from "@angular/core";
import { RegisterModel } from "../../core/auth/model/register.model";
import { SignUpRequestDto } from "../api/dto/sign-up.dto";

@Injectable({
  providedIn: 'root'
})
export class SignUpMapper {

  public toDto(model: RegisterModel): SignUpRequestDto {
    return {
      gender: model.gender,
      title: model.title,
      firstname: model.firstname,
      lastname: model.lastname,
      email: model.email,
      phone: model.phone,
      password: model.password,
      role: model.role,
      terms: model.terms
    } as SignUpRequestDto;
  }
}
