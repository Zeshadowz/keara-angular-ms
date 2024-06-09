import { Injectable } from '@angular/core';
import { RegisterModel } from "./model/register.model";
import { Observable } from "rxjs";
import { UserDto } from "../../shared/api/dto/sign-up.dto";
import { LoginService } from "./login.service";
import { RegisterService } from "./register.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private registerService: RegisterService,
    private loginService: LoginService
  ) {
  }

  registerUser(signUpModel: RegisterModel): Observable<string> {
    return this.registerService.addUser(signUpModel)
  }

  fetchUserByEmail(email: string): Observable<UserDto | undefined> {
    return this.loginService.fetchUserByEmail(email);
  }

  login(username: string, password: string): boolean {
    return true;
  }

  /**
   checkUser: AsyncValidatorFn = (control: AbstractControl): Observable<ValidationErrors | null> => {
   const email = control.value;
   return this.userResourceService.getUserByEmail(email)
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
   }*/

}
