import { Injectable } from '@angular/core';
import { UserResourceService } from "../../shared/api/resources/user-resource.service";
import { SignUpModel } from "./model/sign-up.model";
import { SignUpMapper } from "../../shared/mappers/sign-up.mapper";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userResourceService: UserResourceService, private registrationMapper: SignUpMapper) {
  }

  registerUser(signUpModel: SignUpModel): Observable<string> {
    return this.userResourceService.addUser(this.registrationMapper.toDto(signUpModel))
      .pipe(map(data => data.id))
    /*.subscribe({
      next: data => console.log(JSON.stringify(data)),
      error: err => console.log(err),
      complete: () => console.log("User create completed")
    })*/
  }

  checkUser: AsyncValidatorFn = (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value;
    return this.userResourceService.getUserByEmail(email)
      .pipe(map(response => {
        return response.length > 0 ? {exists: true} : null;
      }))
  }

  checkEmail: AsyncValidatorFn = (control: AbstractControl): Observable<ValidationErrors | null> => {
    return this.userResourceService.getUserByEmail2(control.value)
      .pipe(map(response => {
        for (let key in response) {
          if (response.hasOwnProperty(key)) {
            return {exists: true}
          }
        }
        return null;
      }))
  }

}
