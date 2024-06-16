import { inject, Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { UserDto } from "../../shared/api/dto/sign-up.dto";
import { UserApi } from "../../shared/api/resources/user.api";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly userResourceService = inject(UserApi);

  constructor() {
  }

  fetchUserByEmail(email: string): Observable<UserDto | undefined> {
    return this.userResourceService.getUserByEmail(email)
      .pipe(map(data => {
        return data[0]
      }))
  }
}
