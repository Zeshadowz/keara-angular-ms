import { inject, Injectable } from '@angular/core';
import { UserApi } from "../../shared/api/resources/user.api";
import { RegisterModel } from "./model/register.model";
import { map, Observable } from "rxjs";
import { SignUpMapper } from "../../shared/mappers/sign-up.mapper";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly userApi = inject(UserApi);
  private readonly registrationMapper = inject(SignUpMapper);

  constructor() {
  }

  addUser(signUpModel: RegisterModel): Observable<string> {
    return this.userApi.addUser(this.registrationMapper.toDto(signUpModel))
      .pipe(map(data => data.id))
    /*.subscribe({
      next: data => console.log(JSON.stringify(data)),
      error: err => console.log(err),
      complete: () => console.log("User create completed")
    })*/
  }
}
