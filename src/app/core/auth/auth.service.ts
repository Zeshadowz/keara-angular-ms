import { Injectable } from '@angular/core';
import { UserResourceService } from "../../shared/api/resources/user-resource.service";
import { SignUpModel } from "./model/sign-up.model";
import { SignUpMapper } from "../../shared/mappers/sign-up.mapper";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userResourceService: UserResourceService, private registrationMapper: SignUpMapper) {
  }

  registerUser(signUpModel: SignUpModel) {
    this.userResourceService.addUser(this.registrationMapper.toDto(signUpModel)).subscribe(res => {
      console.log("save", res);
    })
  }

}
