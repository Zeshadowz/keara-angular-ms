import { inject, Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { UserDto } from "../../shared/api/dto/sign-up.dto";
import { UserResourceService } from "../../shared/api/resources/user-resource.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly userResourceService = inject(UserResourceService);

  constructor() {
  }

  fetchUserByEmail(email: string): Observable<UserDto | undefined> {
    return this.userResourceService.getUserByEmail(email)
      .pipe(map(data => {
        return data[0]
      }))
  }
}
